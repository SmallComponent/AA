exports.toProductPage = toProductPage;

function toProductPage(context) {
	context.status = '加载产品页面...';

	let url = context.productUrl;
	return context.curl.get(url);
}
