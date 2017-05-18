;
(function() {

	// 登录
	// 产品页
	// 选号
	// 加入购物车
	// 结算页
	// 确认订单
	// 支付页

	// 售罄 http://www.adidas.com.cn/bb2244
	// 在售 http://www.adidas.com.cn/bb2246

	let userName = 'abc@163.com';
	let password = 'abc123';

	let loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	let productUrl = 'http://www.adidas.com.cn/bb8272'; // productId
	let processUrl = 'http://www.adidas.com.cn/yancheckout/process/'
	let shipUrl = 'https://www.adidas.com.cn/yancheckout/process/saveShippingAndPayment/';
	let payUrl = 'https://www.adidas.com.cn/yancheckout/process/overview/reserved_order_id/4768904189/'; // orderId

	// shipping[firstname]:xx
	// shipping[email]:abc@163.com
	// shipping[country_id]:CN
	// shipping[region_id]:515
	// shipping[region]:天津
	// shipping[city_id]:342
	// shipping[district_id]:3127
	// shipping[city]:天津市
	// shipping[district]:河东区
	// shipping[street][]:sddf
	// shipping[postcode]:233434
	// shipping[mobile]:13412312121
	// shipping[tel_areacode]:
	// shipping[telephone]:
	// shipping[save_in_address_book]:1
	// shipping[use_for_shipping]:1
	// shipping[update_region]:0
	// shipping[primary_shipping]:1
	// shipping[primary_billing]:1
	// shipping[delivery_memo]:ss
	// delivery_type:Normal
	// token:1be8716961532a83fe0380f8d16bb0e0
	// payment[alipay_pay_bank]:ALIPAY
	// payment[alipay_pay_method]:bankPay
	// shipping_method:carrier_bestway
	// fapiao[fapiao_type]:personal
	// fapiao[fapiao_title]:
	// fapiao[fapiao_memo]:


	let size = '42';

	trybuy(size);

	// return void(0);

	function trybuy(size) {
		if(isSealout()) {
			console.log('sealout');
			return;
		}

		let token = getToken();

		let data = getAddCartData(size);
		let addCartUrl = getAddCartUrl();
		return Promise.resolve({
				addCartUrl,
				data
			})
			.then(addToCart)
			.then(submitOrder);
	}

	function submitOrder(data) {
		let result = tryParseResult(data);
		if(result && result.msg === 'success') {
			let data = result.data;
			location.href = data.checkout_link;
		}
	}

	function tryParseResult(data) {
		try {
			return JSON.parse(data);
		} catch(ex) {
			return null;
		}
	}

	function getAddCartData(size) {
		let sizeVal = getSizeVal(size);
		$('#attribute185').val(sizeVal);
		return serializeForm();
	}

	function addToCart(option) {
		let {
			addCartUrl,
			data
		} = option;

		return $.ajax({
			type: "POST",
			url: addCartUrl,
			data: data,
		}).then(function(data) {
				console.log('success', data);
				// console.log(JSON.stringify(JSON.parse(data), null, 2));
				return data;
			},
			function(obj, status) {
				if(obj.status == 429) {
					// $('#hypersale_error').html('当前提交人数过多，请刷新页面重新提交');
					return addToCart();
				} else {
					return Promimse.reject(arguments); // TODO: jquery promise
				}
			});
	}

	function getSizeVal(size) {
		let options = $('#size_box option');
		let option = options.filter(function(index, option) {
			let opt = $(option);
			// console.log(arguments, opt.text(), opt.val());
			return opt.text() == size;
		})[0] || options.get(0);
		return $(option).val();
	}

	function getAddCartUrl() {
		return $('#product_addtocart_form').attr('action');
	}

	function serializeForm() {
		return getForm().serialize();
	}

	function getToken() {
		return getForm().get(0).token.value;
	}

	function isSealout() {
		return getForm().length === 0;
	}

	function getForm() {
		return $('#product_addtocart_form');
	}
})();
