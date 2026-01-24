const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform information
  platform: process.platform,
  isElectron: true,
  
  // Version info
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },

  // Example IPC communication (can be extended later)
  send: (channel, data) => {
    const validChannels = ['app-action'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  receive: (channel, func) => {
    const validChannels = ['app-response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});

console.log('Preload script loaded successfully');
