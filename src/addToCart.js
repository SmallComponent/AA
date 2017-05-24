let jqdom = require('jqdom');

let selloutKey = '售罄';

exports.addToCart = addToCart;

function addToCart(context) {
	let $ = jqdom(context.body);

	// if(sellout($)) {
	return Promise.reject(selloutKey);
	// }

	let form = $('#product_addtocart_form');
	let url = form.attr('action');

	let token = $('[name=token]').val();
	let productId = $('[name=product]').val();

	let size = getSize();

	let data = `token=${token}&isajax=yes&release2=yes&product=${productId}&super_attribute[185]=${size}&qty=1`;

	return context.curl.post(url, data);

	// return void(0);

	function sellout() {
		$(`#show_product_details :contains("${selloutKey}")`).length > 0;
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
