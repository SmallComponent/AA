const {
	BrowserWindow,
	ipcMain,
} = require('electron');

module.exports = createWindow();

function createWindow() {
	console.log('createWindow..................');
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null
	});

	mainWindow.webContents.on('did-finish-load', function() {
		// mainWindow.webContents.send('key', {
		// 	name: 'zs',
		// });
	});

	return mainWindow;
}
