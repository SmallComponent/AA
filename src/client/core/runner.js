const log = require('./logger').log;

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
			log({
				id: context.id,
				type: 'result',
				result: 'success',
			});
			return context;
		})
		.catch(reason => {
			context.status = 'failed:' + reason;
			log({
				id: context.id,
				type: 'result',
				result: 'failed',
				reason: reason,
			});
			return context;
		});
}
