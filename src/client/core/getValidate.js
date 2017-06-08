module.exports = getValidate;

const logger = require('./utils/logger.js');
const curlHelper = require('./curlHelper');

// const validateUrl = 'http://www.adidas.com.cn/captcha/ajax/getestStart/';
const validateUrl = 'http://localhost:9977/gt/register-fullpage/';

function getValidate(context) {
	return Promise.resolve(context)
		.then(curlHelper.createCurl)
		.then(function(context) {
			let time = (new Date()).getTime();
			let url = `${validateUrl}?t=${time}`
			return context.curl.get(url);
		})
		.then(function(context) {
			let data = JSON.parse(context.body);
			// logger.log({
			logger.taskResult({
				task: 'getValidate',
				result: data,
			});
		})
		.catch(reason => {
			context.status = 'failed:' + reason;
			logger.status({
				id: context.id,
				status: 'failed',
				url: context.curl.url,
				reason: JSON.stringify(reason),
			});
			return context;
		});
}
