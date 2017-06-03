;
(function() {
	$(function() {
		bindHandlers();

		const {
			ipcRenderer
		} = require('electron');

		ipcRenderer.on('key', (event, arg) => {
			console.log('render,key', event, arg);
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
				instanceConfig: [{
					id: 1,
					userName: 'abc@163.com',
					password: 'abc123',
					productUrl: 'http://www.adidas.com.cn/cg5804',
					size: 42,
					proxy: 'http://61.191.41.130:80',
					proxyUserName: null,
					proxyPassword: null,
				}],
			});
		});
	}

})();
