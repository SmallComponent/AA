module.exports = {
	getConfigs,
	saveConfigs,
};

const dbName = 'AA';
const collectionName = 'configs';

function getConfigs(ctx, next) {
	return ctx.mongo
		.db(dbName)
		.collection(collectionName)
		.find()
		.toArray()
		.then(configs => {
			configs.forEach(config => {
				config.id = config._id;
				delete config._id;
			});

			ctx.body = {
				data: configs,
			};
		});
}

function saveConfigs(ctx, next) {
	let configs = ctx.request.body.data;

	configs.forEach(config => {
		config._id = config.id;
		delete config.id;
	});

	return ctx.mongo
		.db(dbName)
		.collection(collectionName)
		.remove({})
		.then(() => {
			return ctx.mongo
				.db(dbName)
				.collection(collectionName)
				.insert(configs)
				.then(result => {
					ctx.body = {
						data: result.result.ok,
					};
				});
		});
}

// userName,password,productUrl,size,proxy,proxyUserName,proxyPassword,status
// abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://123.13.204.109:9999,,,xxx
// abcd@163.com,abcd163,http://www.adidas.com.cn/cg5804,42,http://61.191.41.130:80,null,null,
// abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://218.66.253.144:8800,,,xxx
// abcd@163.com,abcd163,http://www.adidas.com.cn/cg5804,42,http://218.29.111.106:9999,null,null,
