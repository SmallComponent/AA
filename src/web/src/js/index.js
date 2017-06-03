const {
	ipcRenderer
} = require('electron');

;
(function() {

	ipcRenderer.on('log', (event, data) => {
		console.log('got log:', data);
	});
	ipcRenderer.on('error', (event, data) => {
		console.log('got error:', data);
	});
	ipcRenderer.on('result', (event, data) => {
		console.log('got result:', data);
	});

	ipcRenderer.on('status', (event, data) => {
		console.log('got status:', data);
	});

})();
