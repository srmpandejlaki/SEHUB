import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine database path
const isElectron = process.env.ELECTRON_RUN === 'true';
const isDev = process.env.NODE_ENV !== 'production';

let dbPath;
if (isElectron && !isDev) {
  // Production Electron: store in app data
  const appDataPath = process.env.APPDATA || path.join(process.env.HOME || '', '.config');
  const appFolder = path.join(appDataPath, 'SEHUB+');
  if (!fs.existsSync(appFolder)) {
    fs.mkdirSync(appFolder, { recursive: true });
  }
  dbPath = path.join(appFolder, 'sehub.db');
} else {
  // Development: store in backend/data folder
  const dataFolder = path.join(__dirname, '../data');
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
  }
  dbPath = path.join(dataFolder, 'sehub.db');
}

console.log('SQLite Database path:', dbPath);

// Initialize SQL.js and database
let db = null;
let SQL = null;

async function initDb() {
  if (db) return db;
  
  SQL = await initSqlJs();
  
  // Try to load existing database
  try {
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      console.log('Loaded existing database');
    } else {
      db = new SQL.Database();
      console.log('Created new database');
    }
  } catch (error) {
    console.error('Error loading database:', error);
    db = new SQL.Database();
  }
  
  return db;
}

// Flag to track if the database has been modified
let isDirty = false;

// Save database to file (async to prevent UI blocking)
function saveDb(force = false) {
  if (db && (isDirty || force)) {
    try {
      // db.export() is synchronous and can be slow for large databases.
      // We only call it when forced or periodically via the interval.
      const data = db.export();
      const buffer = Buffer.from(data);
      // Use async write to prevent blocking the event loop
      fs.writeFile(dbPath, buffer, (err) => {
        if (err) {
          console.error('Error saving database:', err);
        } else {
          isDirty = false;
          console.log('Database saved to disk successfully');
        }
      });
    } catch (error) {
      console.error('Error exporting database:', error);
    }
  }
}

// Auto-save every 10 seconds if dirty
setInterval(() => {
  if (isDirty) {
    saveDb();
  }
}, 10000);

// Save on process exit
process.on('exit', () => saveDb(true));
process.on('SIGINT', () => {
  saveDb(true);
  process.exit();
});

// Wrapper object to provide PostgreSQL-like interface
const dbWrapper = {
  // Query method compatible with PostgreSQL syntax
  query: async (sql, params = []) => {
    await initDb();
    
    try {
      // Replace PostgreSQL placeholders ($1, $2, ...) with SQLite placeholders (?1, ?2, ...)
      // This is crucial for positional binding compatibility
      const sqliteQuery = sql.replace(/\$(\d+)/g, '?$1');

      // Determine query type and table name
      const sqlUpper = sql.trim().toUpperCase();
      const queryType = sqlUpper.split(/\s+/)[0];
      
      if (queryType === 'SELECT') {
        const stmt = db.prepare(sqliteQuery);
        stmt.bind(params);
        
        const rows = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          rows.push(row);
        }
        stmt.free();
        
        return { rows };
      } else if (queryType === 'INSERT' || queryType === 'UPDATE' || queryType === 'DELETE') {
        let returnRows = [];
        
        // Handle RETURNING clause (common in PostgreSQL)
        const hasReturning = sqlUpper.includes('RETURNING');
        
        if (hasReturning) {
          if (queryType === 'INSERT') {
            db.run(sqliteQuery, params);
            isDirty = true;
            // Get the last inserted row
            const lastRowId = db.exec('SELECT last_insert_rowid() as id')[0]?.values[0][0];
            const tableMatch = sql.match(/INSERT INTO\s+([^\s(]+)/i);
            if (tableMatch && lastRowId) {
              const tableName = tableMatch[1];
              const lastRowResult = db.exec(`SELECT * FROM ${tableName} WHERE rowid = ${lastRowId}`);
              if (lastRowResult.length > 0) {
                const columns = lastRowResult[0].columns;
                const values = lastRowResult[0].values[0];
                const row = {};
                columns.forEach((col, i) => {
                  row[col] = values[i];
                });
                returnRows = [row];
              }
            }
          } else if (queryType === 'UPDATE' || queryType === 'DELETE') {
            // For UPDATE/DELETE with RETURNING, find affected rows FIRST if DELETE, or AFTER if UPDATE
            const tableMatch = sql.match(/(?:UPDATE|DELETE FROM|FROM)\s+([^\s(]+)/i);
            const wherePos = sqlUpper.indexOf('WHERE');
            const returningPos = sqlUpper.indexOf('RETURNING');
            
            if (tableMatch && wherePos !== -1) {
              const tableName = tableMatch[1];
              const whereClause = sql.substring(wherePos, returningPos !== -1 ? returningPos : sql.length);
              
              // Map $ placeholders in WHERE clause to ?n for simulation
              const whereQuery = whereClause.replace(/\$(\d+)/g, '?$1');
              
              // For DELETE, we must fetch BEFORE. For UPDATE, we fetch AFTER to get new values.
              if (queryType === 'DELETE') {
                  const selectStmt = db.prepare(`SELECT * FROM ${tableName} ${whereQuery}`);
                  selectStmt.bind(params);
                  while (selectStmt.step()) {
                      returnRows.push(selectStmt.getAsObject());
                  }
                  selectStmt.free();
                  
                  db.run(sqliteQuery, params);
              } else {
                  // UPDATE
                  db.run(sqliteQuery, params);
                  
                  const selectStmt = db.prepare(`SELECT * FROM ${tableName} ${whereQuery}`);
                  selectStmt.bind(params);
                  while (selectStmt.step()) {
                      returnRows.push(selectStmt.getAsObject());
                  }
                  selectStmt.free();
              }
            } else {
              db.run(sqliteQuery, params);
            }
            isDirty = true;
          }
        } else {
          db.run(sqliteQuery, params);
          isDirty = true;
        }
        
        return { rows: returnRows, rowCount: db.getRowsModified() };
      } else {
        // For other queries (CREATE, DROP, etc.)
        db.run(sqliteQuery);
        isDirty = true;
        return { rows: [] };
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  },

  // Execute raw SQL (for DDL statements)
  exec: (sql) => {
    if (!db) {
      console.error('Database not initialized');
      return;
    }
    db.run(sql);
    saveDb();
  },

  // Prepare a statement (for compatibility)
  prepare: (sql) => {
    if (!db) {
      throw new Error('Database not initialized');
    }
    return db.prepare(sql);
  },

  // Connect method for transaction support (compatibility with PostgreSQL pool)
  connect: async () => {
    await initDb();
    return {
      query: dbWrapper.query,
      release: () => {} // No-op for SQLite
    };
  },

  // Initialize database (call this before using)
  init: initDb,
  
  // Save database
  save: saveDb
};

// Initialize on import
initDb().catch(console.error);

export default dbWrapper;
