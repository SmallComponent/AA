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

	// ctx.mongo.db('test').collection('users').remove({
	// 	// _id: mongo.ObjectId(userId)
	// });
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
		.insert(configs)
		.then(result => {
			ctx.body = {
				data: result.result.ok,
			};
		});
}

// let configs = [{
// 	id: 1,
// 	userName: 'abc@163.com',
// 	password: 'abc123',
// 	productUrl: 'http://www.adidas.com.cn/cg5804',
// 	size: 42,
// 	proxy: 'http://61.191.41.130:80',
// 	proxyUserName: '',
// 	proxyPassword: '',
// 	status: 'xxx',
// }, {
// 	id: 2,
// 	userName: 'abcd@163.com',
// 	password: 'abcd163',
// 	productUrl: 'http://www.adidas.com.cn/cg5804',
// 	size: 42,
// 	proxy: 'http://61.191.41.130:80',
// 	proxyUserName: null,
// 	proxyPassword: null,
// }, ];
