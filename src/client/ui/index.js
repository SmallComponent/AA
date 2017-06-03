;
(function() {
	$(function() {
		bindHandlers();

		const {
			ipcRenderer
		} = require('electron');

		ipcRenderer.on('key', (event, arg) => {
			console.log('key', event, arg);
		});

	});

	return void(0);

	function bindHandlers() {

		$('#run').click(function() {
			const remote = require('electron').remote;
			var run = remote.require('./run');
			run({
				userName: 'zs',
				// win: remote.getCurrentWindow(),
			});
		});
	}

})();
