const exec = require('child_process').exec;

const runMulti = require('./core/runMulti');;

let context = {
	instanceConfigs: [{
			id: 1,
			userName: 'abc@163.com',
			password: 'abc123',
			productUrl: 'http://www.adidas.com.cn/cg5804',
			size: 42,
			proxy: '', //'http://61.191.41.130:80',
			proxyUserName: '',
			proxyPassword: '',
			status: 'xxx',
		},
		/*{
		id: 2,
		userName: 'abcd@163.com',
		password: 'abcd163',
		productUrl: 'http://www.adidas.com.cn/cg5804',
		size: 42,
		proxy: 'http://61.191.41.130:80',
		proxyUserName: null,
		proxyPassword: null,
	},*/
	],
};

runMulti.run(context);
