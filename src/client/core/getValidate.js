module.exports = getValidate;

const logger = require('./utils/logger.js');
const curlHelper = require('./curlHelper');

// const validateUrl = 'http://www.adidas.com.cn/captcha/ajax/getestStart/';
const validateUrl = 'http://localhost:9977/gt/register-fullpage/';

function getValidate(config) {
	var context = {};

	return Promise.resolve(context)
		.then(curlHelper.createCurl)
		.then(function(context) {
			let time = (new Date()).getTime();
			let url = `${validateUrl}?t=${time}`
			return context.curl.get(url);
		})
		.then(function(context) {
			let data = JSON.parse(context.body);
			config.task = 'getValidate';
			config.result = data;
			logger.taskResult(config);
		})
		.catch(reason => {
			config.status = 'failed';
			config.url = context.curl.url;
			config.reason = JSON.stringify(reason);
			logger.status(config);

			context.status = 'failed:' + reason;
			return context;
		});
}
