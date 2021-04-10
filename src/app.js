const { app, BrowserWindow } = require('electron')
const path = require('path')
const db = require('./data/db')

// try {
// 	require('electron-reloader')(module);
// } catch {}

async function createWindow () {
  const win = new BrowserWindow({
    width: 450,
    height: 750,
    maximizable: false,
    resizable: false,
    webPreferences: {
     // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  //win.webContents.openDevTools()
  win.setMenu(null);

  var os = require('os');

  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address);
          }
      }
  }
  
  win.loadFile(path.join(__dirname, '/pages/index.html'))

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
