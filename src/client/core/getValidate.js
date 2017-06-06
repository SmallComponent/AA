module.exports = getValidate;

const logger = require('./utils/logger.js');
const curlHelper = require('./curlHelper');

const validateUrl = 'http://www.adidas.com.cn/captcha/ajax/getestStart/';

function getValidate(context) {
	return Promise.resolve(context)
		.then(curlHelper.createCurl)
		.then(function(context) {
			let time = (new Date()).getTime();
			let url = `${validateUrl}?t=${time}`
			return context.curl.get(url);
		})
		.then(function(context) {
			let data = context.body;
			// logger.log({
			logger.taskResult({
				task: 'getValidate',
				result: data,
			});
		});
}
