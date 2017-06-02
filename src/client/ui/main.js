const {
	app,
	BrowserWindow,
	ipcMain,
} = require('electron');
const path = require('path');
const url = require('url');

let win;

init();

return void(0);

function init() {
	app.on('ready', createWindow);
	// app.on('ready', useWebContents);

	app.on('window-all-closed', () => {
		if(process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('activate', () => {
		if(win === null) {
			createWindow()
		}
	});
}

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(url.format({
		pathname: 'index.html',
		// pathname: './pages/index.html',
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null
	});

	win.webContents.on('did-finish-load', function() {
		win.webContents.send('key', {
			name: 'zs',
		});
	});
}
