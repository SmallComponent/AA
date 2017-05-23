exports.getProductForm = getProductForm;

function getProductForm(context) {
	let url = 'http://www.adidas.com.cn/specific/product/ajaxview/';
	let regexp = /url:\s*\"http:\/\/www.adidas.com.cn\/specific\/product\/ajaxview\/\"\,\s*data:\s*\"id=\"\s*\+\s*(\d+)/ig;
	let result = regexp.exec(context.body);
	let productId = result[1];

	url += '?id=' + productId;
	return context.curl.get(url);
}
