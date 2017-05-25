exports.orderDetail = orderDetail;

function orderDetail(context) {
	let url = 'https://www.adidas.com.cn/yancheckout/process/overview/reserved_order_id/4811042026/';
	return context.curl.get(url);
}
