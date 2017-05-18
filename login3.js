;
(function() {
	var userName = 'abc@163.com';
	var password = 'abc123';

	var homeUrl = 'www.adidas.com.cn';
	var loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	// 'https://www.baidu.com/'; //'http://localhost/git/Home/'; //
	let productUrl = 'http://www.adidas.com.cn/cg5804';

	let size = '42';

	openLogin(loginUrl);

	return void(0);

	function openLogin(url) {
		var Curl = require('node-libcurl').Curl;
		// var jqdom = require('jqdom');

		var curl = new Curl();

		curl.setOpt('URL', url);
		curl.setOpt('FOLLOWLOCATION', true);
		curl.setOpt('SSL_VERIFYPEER', false);
		curl.setOpt('HTTPHEADER', [
			'Accept-Encoding:utf-8',
			'Connection:keep-alive',
		]);

		curl.on('end', function(statusCode, body, headers) {

			console.info(statusCode);
			console.info('---');
			console.info(body.length);
			console.info(headers);
			console.info(body);
			console.info('---');
			console.info(this.getInfo('TOTAL_TIME'));

			this.close();
		});

		curl.on('error', function() {
			console.log(arguments);
			curl.close();
		});
		curl.perform();
	}


})();
