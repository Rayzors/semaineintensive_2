const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const remote = require('electron').remote;


let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1200,
    height: 657,
    minHeight: 657,
    frame: false,
    titleBarStyle: 'hidden'
  });

  // mainWindow.setMenu(null);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  })


}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }

});