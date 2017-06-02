;
(function() {

	messageTest();
	menuTest();

	return void(0);

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
