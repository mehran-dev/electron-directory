const { app, BrowserWindow } = require('electron')
const { createMainWindow } = require('./window.js')
const fs = require('fs')
const path = require('path')

let mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', function () {
  mainWindow = createMainWindow()

  mainWindow.openDevTools()
  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }
})

function listFiles(dir, filelist) {
  const files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = listFiles(path.join(dir, file), filelist)
    } else {
      filelist.push(path.join(dir, file))
    }
  })
  return filelist
}

exports.listFiles = listFiles
