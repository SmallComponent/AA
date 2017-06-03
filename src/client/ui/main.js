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

function bindRenderAndWorkerMessage(mainWindow, workProcess) {
	workProcess.stdout.on('data', function(data) {
		parseMessages(data)
			.forEach(function(message) {
				mainWindow.webContents.send(message.type || '', message);
			});
	});

	ipcMain.on('command', function(event, data) {
		var result = workProcess.stdin.write(JSON.stringify(data), function() {
			console.log('write callback', arguments);
		});
		console.log('write result:', result);
	})
}

function parseMessages(data) {
	console.log(data);
	// console.log('**************************');
	// data.split(/}\s*{/ig)
	// 	.forEach(m => console.log(m));
	// return;
	return data.split(/}\s*{/ig)
		.map(message => {
			console.log(message);
			// message = message.replace();
			if(!/^\s*{/ig.test(message)) {
				message = '{' + message;
			}
			if(!/}\s*$/ig.test(message)) {
				message = message + '}';
			}

			console.log('***********', message, '############');
			return JSON.parse(message);
		});
}
