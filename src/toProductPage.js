exports.toProductPage = toProductPage;

function toProductPage(context) {
	let url = context.productUrl;
	return context.curl.get(url);
}
