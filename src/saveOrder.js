exports.saveOrder = saveOrder;

function saveOrder(context) {
	let url = 'https://www.adidas.com.cn/yancheckout/process/saveShippingAndPayment/';
	let data = '';

	return context.curl.post(url, data);
}
