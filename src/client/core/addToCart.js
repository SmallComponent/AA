let jqdom = require('jqdom');

let selloutKey = '售罄';

const addCarUrl = 'http://www.adidas.com.cn/checkout/cart/add/';

exports.addToCart = addToCart;

function addToCart(context) {
	context.status = '加入购物车...';

	let $ = jqdom(context.body);

	if(sellout($)) {
		return Promise.reject(selloutKey);
	}

	let form = $('#product_addtocart_form');
	let url = form.attr('action');

	let timeString = $(".time").data('time');
	let time = new Date(timeString.replace(',', ' '));

	let token = $('[name=token]').val();
	let productId = $('[name=product]').val();

	let size = getSize();

	let validateData = context.validateData;
	let geetest_challenge = validateData.geetest_challenge;
	let geetest_validate = validateData.geetest_validate;
	let geetest_seccode = validateData.geetest_seccode;


	let dataArr = [
		['token', token],
		['isajax', 'yes'],
		['release2', 'yes'],
		['product', productId],
		['super_attribute[185]', size],
		['qty', 1],
		['geetest_challenge', geetest_challenge],
		['geetest_validate', geetest_validate],
		['geetest_seccode', geetest_seccode],
	];

	let data = dataArr.map(kv => kv.join('='))
		.join('&');

	// let data = `token=${token}&isajax=yes&release2=yes&product=${productId}&super_attribute[185]=${size}&qty=1&geetest_challenge=${geetest_challenge}&geetest_validate=${geetest_validate}&geetest_seccode=${geetest_seccode}`;

	return post();

	// return void(0);

	function post() {
		return context.curl.post(url, data)
			.then(function(context) {
				if(context.statusCode === 429) {
					return post();
				} else {
					return context;
				}
			});
	}

	function sellout() {
		$(`#
				show_product_details: contains("${selloutKey}")
				`).length > 0;
	}

	function getSize() {
		let allSize = $(".copySelectSize select option");

		let size = allSize.filter(function() {
			return $(this).text() == context.size;
		}).val();

		if(!size) {
			size = allSize.first().val();
		}

		return size;
	}
}
