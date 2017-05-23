exports.toProductPage = toProductPage;

function toProductPage(context) {
	let productUrl = 'http://www.adidas.com.cn/cg5804';
	return context.curl.get(productUrl);
}
