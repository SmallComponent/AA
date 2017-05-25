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

var context = {
	userName: 'abc@163.com',
	password: 'abc123',
	productUrl: 'http://www.adidas.com.cn/cg5804',
	size: 42,
	proxy: 'http://61.191.41.130:80',
	proxyUserName: null,
	proxyPassword: null,
	proxyUserName: 'userName',
	proxyPassword: 'password',
};

Promise.resolve(context)
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
	.catch(console.log.bind(console));
