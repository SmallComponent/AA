exports.getProductForm = getProductForm;

function getProductForm(context) {
	context.status = '加载产品表单...';

	let url = 'http://www.adidas.com.cn/specific/product/ajaxview/';

	productId = context.productId;
	url += '?id=' + productId;
	return context.curl.get(url);
}
