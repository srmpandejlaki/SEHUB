const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const http = require('http');
const fs = require('fs');

// Determine if we're in development or production
const isDev = !app.isPackaged;

let mainWindow;
let backendProcess;

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Get the correct path for resources
function getResourcePath(relativePath) {
  if (isDev) {
    return path.join(__dirname, '..', relativePath);
  }
  return path.join(process.resourcesPath, relativePath);
}

// Check if backend is ready
function waitForBackend(maxAttempts = 60) {
  return new Promise((resolve) => {
    let attempts = 0;
    
    const checkBackend = () => {
      attempts++;
      console.log(`Checking backend... attempt ${attempts}`);
      
      const req = http.get('http://localhost:5000/api/sehub/users', (res) => {
        console.log('Backend is ready!');
        resolve(true);
      });
      
      req.on('error', () => {
        if (attempts >= maxAttempts) {
          console.log('Backend check timeout, proceeding anyway...');
          resolve(false);
        } else {
          setTimeout(checkBackend, 500);
        }
      });
      
      req.setTimeout(1000, () => {
        req.destroy();
        if (attempts >= maxAttempts) {
          resolve(false);
        } else {
          setTimeout(checkBackend, 500);
        }
      });
    };
    
    // Start checking after a short delay
    setTimeout(checkBackend, 1000);
  });
}

// Start backend using fork with ESM support
function startBackend() {
  return new Promise((resolve) => {
    const backendDir = getResourcePath('backend');
    const backendScript = path.join(backendDir, 'src', 'app.js');
    
    console.log('Backend directory:', backendDir);
    console.log('Backend script:', backendScript);
    console.log('Script exists:', fs.existsSync(backendScript));
    
    // Set up environment
    const env = {
      ...process.env,
      NODE_ENV: isDev ? 'development' : 'production',
      ELECTRON_RUN: 'true'
    };
    
    // Use fork with ESM loader - this uses Electron's Node.js
    try {
      backendProcess = fork(backendScript, [], {
        cwd: backendDir,
        env: env,
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        execArgv: [] // No special args needed for ESM with "type": "module"
      });
      
      backendProcess.stdout.on('data', (data) => {
        const msg = data.toString();
        console.log(`Backend stdout: ${msg}`);
        if (msg.includes('Server berjalan')) {
          resolve(true);
        }
      });
      
      backendProcess.stderr.on('data', (data) => {
        console.error(`Backend stderr: ${data.toString()}`);
      });
      
      backendProcess.on('error', (err) => {
        console.error('Failed to start backend process:', err);
        resolve(false);
      });
      
      backendProcess.on('exit', (code) => {
        console.log(`Backend process exited with code ${code}`);
      });

      backendProcess.on('message', (msg) => {
        console.log('Backend message:', msg);
      });
      
      // Timeout fallback
      setTimeout(() => {
        console.log('Backend start timeout, resolving...');
        resolve(true);
      }, 8000);
      
    } catch (error) {
      console.error('Error forking backend:', error);
      resolve(false);
    }
  });
}

// Stop backend
function stopBackend() {
  if (backendProcess) {
    console.log('Stopping backend...');
    backendProcess.kill('SIGTERM');
    backendProcess = null;
  }
}

// Create main window
function createWindow() {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    icon: isDev 
      ? path.join(__dirname, '../build/icon.png')
      : path.join(process.resourcesPath, 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false
    },
    autoHideMenuBar: true,
    show: false
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', 'frontend', 'dist', 'index.html');
    console.log('Loading frontend from:', indexPath);
    console.log('Frontend exists:', fs.existsSync(indexPath));
    mainWindow.loadFile(indexPath);
    
    // Open DevTools in production for debugging
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Frontend loaded successfully');
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(async () => {
  console.log('App is ready, starting backend...');
  console.log('Is packaged:', app.isPackaged);
  console.log('Resource path:', process.resourcesPath);
  
  await startBackend();
  console.log('Waiting for backend to be ready...');
  await waitForBackend();
  console.log('Creating window...');
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  stopBackend();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  stopBackend();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
