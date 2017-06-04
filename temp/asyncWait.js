var sleep = function(time) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			return resolve(5);
			// 模拟出错了，返回 ‘error’
			reject('error');
		}, time);
	})
};

var start = async function() {
	try {
		console.log('start');
		console.log('sleep', await sleep(3000));
		// 这里得到了一个返回错误

		// 所以以下代码不会被执行了
		console.log('end');

		return 'xxxxxxx';
	} catch(err) {
		console.log(err);
		// 这里捕捉到错误 `error`
	}
};

async function test() {
	console.log('1')
	var result = await start();
	console.log(result);
	console.log('2')
};

console.log('last', test())
