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
		let workProcess = require('./node/workProcess');

		workProcess.stdout.on('data', function(data) {
			mainWindow.webContents.send('workMessage', data);
		});

		ipcMain.on('command', function(event, data) {
			var result = workProcess.stdin.write(JSON.stringify(data),function(){
				console.log('write callback',arguments);
			});
			console.log('write result:',result);
		})


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

	// app.on('activate', () => {
	// 	if(win === null) {
	// 		createWindow()
	// 	}
	// });
}
