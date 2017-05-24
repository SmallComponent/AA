exports.toOrder = toOrder;

function toOrder(context) {
	let data = context.body;

	if(isFailed(data)) {
		return Promise.reject(`添加购物车失败：${data}`);
	} else {
		let url = 'http://www.adidas.com.cn/yancheckout/process/';
		return context.curl.get(url);
	}

	// return void(0);

	function isFailed(data) {
		return data == 'success' ||
			data == "success2" ||
			data == 'fail' ||
			data == '4'
	}

}

// if(data == 'success') {
// 	callback({
// 		result: "success"
// 	}); //
// 	analyst_add_to_cart();
// } else if(data == "success2") {
// 	$common.loading.show();
// 	location.href = "http://www.adidas.com.cn/yancheckout/process/hypersale/";
// } else if(data == 'fail') {
// 	$('#hypersale_error').html('添加失败，定制和普通商品不能同时加入购物车！');
// 	callback({
// 		result: "fail"
// 	}); //
// } else if(data == '4') {
// 	$('#hypersale_error').html('重复购买');
// } else {
//
// }
