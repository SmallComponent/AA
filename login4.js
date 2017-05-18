;
(function() {
	var userName = 'abc@163.com';
	var password = 'abc123';

	var homeUrl = 'www.adidas.com.cn';
	var loginUrl = 'http://www.baidu.com/'; // 'https://www.adidas.com.cn/customer/account/login/';
	// 'http://localhost/git/Home/'; //
	let productUrl = 'http://www.adidas.com.cn/cg5804';

	let size = '42';

	openLogin(loginUrl);

	return void(0);

	function openLogin(url) {
		var request = require('request');

		var options = {
			url: url,
			headers: {
				'User-Agent': 'request',
				'Accept-Encoding': 'utf-8',
				'Connection': 'keep-alive',
			}
		};

		function callback(error, response, body) {
			if(error) {
				console.log('error', error);
			} else if(response.statusCode == 200) {
				console.log('body', body);
			} else {
				console.log('statusCode', response.statusCode);
			}
		}

		// request(options, callback);
		request.get(url, options, callback);
	}


})();
