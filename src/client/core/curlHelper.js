const path = require('path');
const fs = require('fs');
const Curl = require('node-libcurl').Curl;

const logger = require('./utils/logger');

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
	// curl.context = context;

	appendHttpMethod(context);

	context.status = 'curl created';
	return context;
}

function createCookieFile() {
	var timeSpan = Date.now();
	var random = Math.random();

	let filePath = getLogFilePath('cookies', `cookie-${timeSpan}-${random}.txt`);

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
		logger.status({
			id: context.id,
			status: context.status,
		});

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
		.replace(/[:\/\.\?]/ig, '_')
		.substring(0, 180);

	let bodyFileName = `${i}_${fileName}_body.html`;
	let bodyPath = getLogFilePath(result.id, bodyFileName);
	fs.writeFileSync(bodyPath, result.body);
	result.bodyPath = bodyPath;

	let headerFileName = `${i}_${fileName}_header.json`;
	let headerPath = getLogFilePath(result.id, headerFileName)
	fs.writeFileSync(headerPath, JSON.stringify(result.headers));
	result.headerPath = headerPath;

	i++;
}

function bindErrorHandler(context) {
	let curl = context.curl;

	curl.on('error', function(error) {
		logger.error({
			id: context.id,
			url: context.curl.url,
			error: error,
		});
		if(curl.error) {
			curl.error({
				curl: curl,
				error: error,
			});
		}
	});
}

function httpGet(url, callback) {
	logger.log({
		// id: this.context.id,
		action: 'get',
		url: url,
	});

	this.url = url;

	this.setOpt(Curl.option.URL, url);
	this.perform();
	return this.httpResult();
}

function httpPost(url, data) {
	logger.log({
		// id: this.context.id,
		action: 'post',
		url: url,
		data: data,
	});

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

function getLogFilePath(id, fileName) {
	let fullPath = path.join(getLogFolder(), `./${id}-${fileName}`);
	return fullPath;
}

function getLogFolder() {
	let fullPath = path.join(__dirname, `./log/`);
	return fullPath;
}
