;
(function() {

	const {
		ipcRenderer
	} = require('electron');


	ipcRenderer.on('asynchronous-reply', (event, arg) => {
		console.log(arg); // prints "pong"
	});

	ipcRenderer.send('asynchronous-message', 'ping asyn');

	console.log(ipcRenderer.sendSync('synchronous-message', 'ping sync')); // prints "pong"

})();
