let jqdom = require('jqdom');

exports.pay = pay;

function pay(context) {
	context.status = '生成支付二维码...';

	const $ = jqdom(context.body);
	const payUrl = $('[title="立即支付"]').attr('href');

	// return new Promise(function(resolve, reject) {
	// 	var page = require('webpage').create();
	// 	page.open('http://github.com/', function() {
	// 		page.render('github.png');
	// 		phantom.exit();
	// 		return resolve();
	// 	});
	// });
	return context.curl.get(payUrl);
}
