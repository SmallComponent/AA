const {
	app,
	ipcMain,
} = require('electron');
const path = require('path');
const url = require('url');

const startReg = /^\s*{/ig;
const endReg = /}\s*$/ig;


init();

return void(0);

function init() {
	app.on('ready', function() {
		let mainWindow = require('./node/mainWindow');
		let workProcess = require('./node/workProcess');

		bindRenderAndWorkerMessage(mainWindow, workProcess);
		mainWindow.loadURL('http://localhost:3000');

		// mainWindow.loadURL(url.format({
		// 	// pathname: './browser/index.html',
		// 	// pathname: '/pages/index.html',
		// 	pathname: 'http://localhost:3000',
		// 	// protocol: 'file:',
		// 	slashes: true
		// }));
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

function bindRenderAndWorkerMessage(mainWindow, workProcess) {
	workProcess.stdout.on('data', function(data) {
		parseMessages(data)
			.forEach(function(message) {
				mainWindow.webContents.send(message.type || 'log', message);
			});
	});

	ipcMain.on('command', function(event, data) {
		console.log('got command:', data);
		var result = workProcess.stdin.write(JSON.stringify(data));
	})
}

function parseMessages(data) {
	return data.split(/\n|\r/ig)
		.filter(message => !!message.trim())
		.map(message => {
			try {
				return JSON.parse(message);
			} catch(e) {
				return message;
			}
		});
}
