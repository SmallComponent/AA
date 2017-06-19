exports.toProductPage = toProductPage;
exports.parseProductId = parseProductId;

function toProductPage(context) {
	context.status = '加载产品页面...';

	return getProductId(context);
}

function getProductId(context) {
	let url = context.productUrl;
	return context.curl.get(url)
		.then(function (context) {
			let productId = parseProductId(context.body);

			if (productId) {
				context.productId = productId;
				return context;
			} else {
				//产品页面可能还没有发布，接着刷产品页面，中间应该能设置一定时间间隔:200ms，免得被拉黑
				return new Promise(function(resolve,reject){
					setTimeout(function(){
						getProductId(context)
						.then(cxt=>resolve(cxt));
					},200);
				});
				
			}
		});
}

function parseProductId(body){
	let regexp = /url:\s*\"http:\/\/www.adidas.com.cn\/specific\/product\/ajaxview\/\"\,\s*data:\s*\"id=\"\s*\+\s*(\d+)/ig;
	let result = regexp.exec(body);
	return result[1];
}

