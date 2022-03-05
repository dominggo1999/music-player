/* eslint-disable no-void */

const {
  BrowserWindow,
  app,
  ipcMain,
  protocol,
  nativeTheme,
  dialog,
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const util = require('util');
const fs = require('fs');
const recursive = require('recursive-readdir');

const scanRecursive = util.promisify(recursive);

const resolve = path.resolve;

const r = (path) => resolve(__dirname, path);

// the first argument can be: a file, directory or glob pattern
require('electron-reload')(path.join(__dirname, '../'));

let window;

const height = 650;
const width = 800;
function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    //  change to false to use AppBar
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    autoHideMenuBar: true,
  });
  const port = process.env.PORT || 3000;

  const url = isDev ? `http://localhost:${port}` : r('../out/index.html');
  // and load the index.html of the app.
  if (isDev) {
    window === null || window === void 0 ? void 0 : window.loadURL(url);
  } else {
    window === null || window === void 0 ? void 0 : window.loadFile(url);
  }
  // Open the DevTools.
  window.webContents.openDevTools();

  // Dark mode
  nativeTheme.themeSource = 'dark';

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });
  ipcMain.on('close', () => {
    window.close();
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) { createWindow(); }
  });

  // Create protocol for accessing local url
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = decodeURIComponent(request.url);
    const pathname = url.replace('atom://', '');
    callback({ path: pathname });
  });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});

const getFiles = async () => {
  const result = await dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
  });
  const folder = result.filePaths[0];

  const ignoreFunction = (file, stats) => {
    const acceptedFileExt = [
      '.mp3',
      '.m4a',
      '.webm',
      '.wav',
      '.aac',
      '.ogg',
      '.opus',
    ];

    const ext = path.extname(file).toLowerCase();

    // Ignore all non-music files
    return !acceptedFileExt.includes(ext);
  };

  let files = await scanRecursive(folder, [ignoreFunction]);
  files = files.map((item) => {
    return {
      name: path.basename(item),
      path: item,
    };
  });

  window.webContents.send('get-files', files);
};

ipcMain.handle('select-dirs', async (event, arg) => {
  getFiles();
});
