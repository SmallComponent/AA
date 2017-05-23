;
(function() {
	let fs = require('fs');
	let path = require('path');

	let userName = 'abc@163.com';
	let password = 'abc123';

	let i = 1;


	let Curl = require('node-libcurl').Curl;
	let jqdom = require('jqdom');

	createCurl()
		.then(loadLoginPage)
		.then(login)
		.then(toProductPage)
		.then(addToCart)
		.then(toProcess)
		.then(saveOrder)
		.then(orderDetail)
		// .then(pay)
		.catch(console.log.bind(console));

	return void(0);

	function loadLoginPage(result) {
		let loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
		return result.curl.get(loginUrl);
	}

	function login(result) {
		let loginPostUrl = 'https://www.adidas.com.cn/customer/account/loginPost/';
		let data = `login%5Busername%5D=abc%40163.com&login%5Bpassword%5D=abc123`;

		return result.curl.post(loginPostUrl, data);
	}

	function toProductPage(result) {
		let productUrl = 'http://www.adidas.com.cn/cg5804';
		return result.curl.get(productUrl);
	}

	function addToCart(result) {
		let addCartUrl = 'http://www.adidas.com.cn/checkout/cart/add/';
		let data = `token=b90bff18624d90ad4677124317c6b050&isajax=yes&release2=yes&product=333157&super_attribute%5B185%5D=49&qty=1`;

		return result.curl.post(addCartUrl, data);
	}

	function toProcess(result) {
		let url = 'http://www.adidas.com.cn/yancheckout/process/';
		return result.curl.get(url);
	}

	function saveOrder(result) {
		let url = 'https://www.adidas.com.cn/yancheckout/process/saveShippingAndPayment/';
		let data = '';

		return result.curl.post(url, data);
	}

	function orderDetail(result) {
		let url = 'https://www.adidas.com.cn/yancheckout/process/overview/reserved_order_id/4811042026/';
		return result.curl.get(url);
	}

	function pay(result) {
		let url = 'https://mapi.alipay.com/gateway.do?_input_charset=utf-8&logistics_fee=0&logistics_payment=BUYER_PAY&logistics_type=EXPRESS&notify_url=https%3A%2F%2Fwww.adidas.com.cn%2Falipay%2Fpayment%2Fconfirm%2F&out_trade_no=6199893593&partner=2088801058693440&payment_type=1&paymethod=motoPay&price=1099.00&quantity=1&return_url=https%3A%2F%2Fwww.adidas.com.cn%2Falipay%2Fpayment%2Fsuccess%2F&seller_email=shopadidascn2012%40gmail.com&service=create_direct_pay_by_user&subject=6199893593&sign=73deba086f1b175a7a6f5570847631b0&sign_type=MD5';
		return result.curl.get(url);
	}

	function createCurl() {
		let curl = new Curl();

		let cookieFilePath = getLogFilePath('cookie.txt');
		curl.setOpt(Curl.option.COOKIEFILE, cookieFilePath);
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

			let result = {
				curl: curl,
				statusCode: statusCode,
				body: body,
				headers: headers,
			};

			logResult(result);

			if(curl.end) {
				curl.end(result);
			}
		});
	}

	function logResult(result) {
		let fileName = result.curl.url
			.replace('//www.adidas.com.cn/', '')
			.replace(/[:\/\.]/ig, '_');

		let bodyFileName = `${i}_${fileName}_body.html`;
		let bodyPath = getLogFilePath(bodyFileName);
		fs.writeFileSync(bodyPath, result.body);

		let headerFileName = `${i}_${fileName}_header.json`;
		let headerPath = getLogFilePath(headerFileName)
		fs.writeFileSync(headerPath, JSON.stringify(result.headers));

		i++;
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
		this.url = url;

		this.setOpt(Curl.option.URL, url);
		this.perform();
		return this.httpResult();
	}

	function httpPost(url, data) {
		console.log('post:', url, data);
		this.url = url;

		this.setOpt(Curl.option.URL, url);
		this.setOpt(Curl.option.POST, true);
		this.setOpt(Curl.option.POSTFIELDS, data);
		this.perform();
		return this.httpResult();
	}

	function httpResult() {
		let curl = this;
		return new Promise(function(resolve, reject) {
			curl.end = resolve;
			curl.error = reject;
		});
	}


	function getLogFilePath(fileName) {
		return path.join(__dirname, '../log', fileName);
	}
})();
