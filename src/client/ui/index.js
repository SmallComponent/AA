;
(function() {
	$(function() {
		bindHandlers();
	});

	// messageTest();
	// menuTest();

	// newWindowTest();
	// remoteCallbackTest();

	return void(0);

	function bindHandlers() {

		$('#run').click(function() {
			const remote = require('electron').remote;
			var run = remote.require('./run');
			run({
				userName: 'zs',
			});
		});
	}

	function remoteCallbackTest() {
		var mapNumbers = require('electron').remote.require('./mapNumbers');

		var withRendererCb = mapNumbers.withRendererCallback(function fnInRender(x) {
			console.log('log from render call by main', x);
			return x + 1;
		});

		var withLocalCb = mapNumbers.withLocalCallback();

		console.log(withRendererCb, withLocalCb);
	}

	function newWindowTest() {
		const remote = require('electron').remote;
		const BrowserWindow = remote.BrowserWindow;
		var win = new BrowserWindow({
			width: 800,
			height: 600
		});
		win.loadURL('https://github.com');
	}

	function messageTest() {
		const {
			ipcRenderer
		} = require('electron');


		ipcRenderer.on('asynchronous-reply', (event, arg) => {
			console.log(arg); // prints "pong"
		});

		ipcRenderer.send('asynchronous-message', 'ping asyn');

		console.log(ipcRenderer.sendSync('synchronous-message', 'ping sync')); // prints "pong"

		console.log('done');
	}

	function menuTest() {
		const {
			remote
		} = require('electron');
		const {
			Menu,
			MenuItem
		} = remote;
		const menu = new Menu();
		menu.append(new MenuItem({
			label: 'MenuItem1',
			click() {
				console.log('item 1 clicked');
			}
		}));
		menu.append(new MenuItem({
			type: 'separator'
		}));
		menu.append(new MenuItem({
			label: 'MenuItem2',
			type: 'checkbox',
			checked: true
		}));
		window.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			menu.popup(remote.getCurrentWindow());
		}, false);
	}
})();
