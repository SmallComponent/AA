let path = require('path');
let fs = require('fs');
let Curl = require('node-libcurl').Curl;

let i = 1;

exports.createCurl = createCurl;

function createCurl(context) {
	let curl = new Curl();

	let cookieFilePath = createCookieFile();
	curl.setOpt(Curl.option.COOKIEFILE, cookieFilePath);
	// curl.setOpt(Curl.option.COOKIEJAR, cookieFile);

	curl.setOpt(Curl.option.FOLLOWLOCATION, true);
	curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
	curl.setOpt(Curl.option.HTTPHEADER, [
		'Accept-Encoding:utf-8',
		'Connection:keep-alive',
	]);

	if(context.proxy) {
		curl.setOpt(Curl.option.PROXY, context.proxy);
	}

	if(context.proxyUserName) {
		curl.setOpt(Curl.option.PROXYUSERNAME, context.proxyUserName);
	}

	if(context.proxyPassword) {
		curl.setOpt(Curl.option.PROXYPASSWORD, context.proxyPassword);
	}

	context.curl = curl;

	appendHttpMethod(context);

	return context;
}

function createCookieFile() {
	var timeSpan = Date.now();
	var random = Math.random();

	let filePath = getLogFilePath(`cookie-${timeSpan}-${random}.txt`);

	if(!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, '');
	}

	return filePath;
}

function appendHttpMethod(context) {
	let curl = context.curl;

	curl.httpResult = httpResult;

	curl.get = httpGet;
	curl.post = httpPost;

	bindEndHandler(context);
	bindErrorHandler(context);
}

function bindEndHandler(context) {
	let curl = context.curl;

	curl.on('end', function(statusCode, body, headers) {
		console.log('end:', statusCode /*, body, headers*/ );

		context.statusCode = statusCode;
		context.body = body;
		context.headers = headers;

		logResult(context);

		if(curl.end) {
			curl.end(context);
		}
	});
}

function logResult(result) {
	let fileName = result.curl.url
		.replace('//www.adidas.com.cn/', '')
		.replace(/[:\/\.\?]/ig, '_');

	let bodyFileName = `${i}_${fileName}_body.html`;
	let bodyPath = getLogFilePath(bodyFileName);
	fs.writeFileSync(bodyPath, result.body);

	let headerFileName = `${i}_${fileName}_header.json`;
	let headerPath = getLogFilePath(headerFileName)
	fs.writeFileSync(headerPath, JSON.stringify(result.headers));

	i++;
}

function bindErrorHandler(context) {
	let curl = context.curl;

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
