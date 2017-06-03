;
(function() {
	const {
		ipcRenderer
	} = require('electron');

	$(function() {
		bindHandlers();

		ipcRenderer.on('log', (event, data) => {
			console.log('got log:', data);
		});
		ipcRenderer.on('error', (event, data) => {
			console.log('got error:', data);
		});
		ipcRenderer.on('result', (event, data) => {
			console.log('got result:', data);
		});

	});

	return void(0);

	function bindHandlers() {

		$('#run').click(function() {
			var config = {
				userName: 'zs',
				// win: remote.getCurrentWindow(),
				instanceConfigs: [{
					id: 1,
					userName: 'abc@163.com',
					password: 'abc123',
					productUrl: 'http://www.adidas.com.cn/cg5804',
					size: 42,
					proxy: 'http://61.191.41.130:80',
					proxyUserName: null,
					proxyPassword: null,
				}, {
					id: 2,
					userName: 'abc@163.com',
					password: 'abc123',
					productUrl: 'http://www.adidas.com.cn/cg5804',
					size: 42,
					proxy: 'http://61.191.41.130:80',
					proxyUserName: null,
					proxyPassword: null,
				}],
			};

			ipcRenderer.send('command', config);
		});
	}

})();
