let runner = require('./core/runner');

let contexts = getConfigs();
startAll(contexts)
	.then(showResult)
	.catch(console.log.bind(console));

return void(0);

function startAll(contexts) {
	let process = contexts.map(context => runner.start(context));
	return Promise.all(process);
}

function showResult(contexts) {
	let results = contexts.map(context => context.status);
	let resultsString = JSON.stringify(results, null, 2);
	console.log('results:', resultsString);
}

function getConfigs() {
	return [{
		userName: 'abc@163.com',
		password: 'abc123',
		productUrl: 'http://www.adidas.com.cn/cg5804',
		size: 42,
		proxy: 'http://61.191.41.130:80',
		proxyUserName: null,
		proxyPassword: null,
	}];
}
