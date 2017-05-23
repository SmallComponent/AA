exports.toOrder = toOrder;

function toOrder(context) {
	let url = 'http://www.adidas.com.cn/yancheckout/process/';
	return context.curl.get(url);
}
