const logger = require('./utils/logger');

let curlHelper = require('./curlHelper');

let loadLoginPage = require('./loadLoginPage').loadLoginPage;
let login = require('./login').login;
let toProductPage = require('./toProductPage').toProductPage;
let getProductForm = require('./getProductForm').getProductForm;
let addToCart = require('./addToCart').addToCart;
let toOrder = require('./toOrder').toOrder;
let saveOrder = require('./saveOrder').saveOrder;
let orderDetail = require('./orderDetail').orderDetail;
// let pay = require('./pay').pay;

exports.start = start;

function start(context) {
	context.status = 'initializing';
	return Promise.resolve(context)
		.then(curlHelper.createCurl)
		.then(loadLoginPage)
		.then(login)
		.then(toProductPage)
		.then(getProductForm)
		.then(addToCart)
		.then(toOrder)
		.then(saveOrder)
		// .then(orderDetail)
		// .then(pay)
		.then(context => {
			context.status = 'success';
			logger.status({
				id: context.id,
				url: context.curl.url,
				status: 'success',
			});
			return context;
		})
		.catch(reason => {
			context.status = 'failed:' + reason;
			logger.status({
				id: context.id,
				status: 'failed',
				url: context.curl?context.curl.url:'undefined',
				reason: JSON.stringify(reason),
			});
			return context;
		});
}
