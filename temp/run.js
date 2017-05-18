;
(function() {
	var path = require('path');
	var cookieFile = path.join(__dirname, 'cookie.txt');
	console.log(cookieFile);

	var userName = 'abc@163.com';
	var password = 'abc123';

	var loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	let productUrl = 'http://www.adidas.com.cn/cg5804';

	var Curl = require('node-libcurl').Curl;
	var jqdom = require('jqdom');

	createCurl()
		.then(loadLogin)
		.then(login)
		.then(toProductPage)
		.catch(console.log.bind(console));

	return void(0);

	function loadLogin(result) {
		return result.curl.get(loginUrl);
	}

	function login(result) {
		var loginPostUrl = 'https://www.adidas.com.cn/customer/account/loginPost/';
		var data = `login%5Busername%5D=abc%40163.com&login%5Bpassword%5D=abc123`;

		return result.curl.post(loginPostUrl, data)
			.then(function(result) {
				console.log(result.statusCode);
				return result;
			});
	}

	function toProductPage(result) {
		return result.curl.get(productUrl)
			.then(function(result) {
				console.log(result.body);
				return result;
			});
	}

	function createCurl() {
		var curl = new Curl();

		curl.setOpt(Curl.option.COOKIEFILE, cookieFile);
		// curl.setOpt(Curl.option.COOKIEJAR, cookieFile);

		curl.setOpt(Curl.option.FOLLOWLOCATION, true);
		curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
		curl.setOpt(Curl.option.HTTPHEADER, [
			'Accept-Encoding:utf-8',
			'Connection:keep-alive',
		]);

		appendHttpMethod(curl);

		// return curl;
		return Promise.resolve({
			curl: curl
		});
	}

	function appendHttpMethod(curl) {
		curl.httpResult = httpResult;

		curl.get = httpGet;
		curl.post = httpPost;

		bindEndHandler(curl);
		bindErrorHandler(curl);
	}

	function bindEndHandler(curl) {
		curl.on('end', function(statusCode, body, headers) {
			console.log('end:', statusCode /*, body, headers*/ );
			if(curl.end) {
				curl.end({
					curl: curl,
					statusCode: statusCode,
					body: body,
					headers: headers,
				});
			}
		});
	}

	function bindErrorHandler(curl) {
		curl.on('error', function(error) {
			console.log('error:', error);
			if(curl.error) {
				curl.error({
					curl: curl,
					error: error,
				});
			}
		});
	}

	function httpGet(url, callback) {
		console.log('get:', url);
		this.setOpt(Curl.option.URL, url);
		this.perform();
		return this.httpResult();
	}

	function httpPost(url, data) {
		console.log('post:', url, data);

		this.setOpt(Curl.option.URL, url);
		this.setOpt(Curl.option.POST, true);
		this.setOpt(Curl.option.POSTFIELDS, data);
		this.perform();
		return this.httpResult();
	}

	function httpResult() {
		var curl = this;
		return new Promise(function(resolve, reject) {
			curl.end = resolve;
			curl.error = reject;
		});
	}

})();
