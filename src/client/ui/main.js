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
	addMessageHandler();

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

function useWebContents() {
	let win = new BrowserWindow({
		width: 800,
		height: 1500
	});
	win.loadURL('http://github.com');
	let contents = win.webContents;
	console.log(contents);
}

function addMessageHandler() {
	ipcMain.on('asynchronous-message', (event, arg) => {
		console.log(arg); // prints "ping"
		event.sender.send('asynchronous-reply', 'pong asyn');
	});

	ipcMain.on('synchronous-message', (event, arg) => {
		event.returnValue = 'pong sync';
		console.log(arg); // prints "ping"
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
}
