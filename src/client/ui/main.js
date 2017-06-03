const {
	app,
	ipcMain,
} = require('electron');
const path = require('path');
const url = require('url');

init();

return void(0);

function init() {
	app.on('ready', function() {
		let mainWindow = require('./node/mainWindow');
		mainWindow.loadURL(url.format({
			pathname: './browser/index.html',
			// pathname: './pages/index.html',
			protocol: 'file:',
			slashes: true
		}));
	});
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
