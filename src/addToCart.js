let jqdom = require('jqdom');

exports.addToCart = addToCart;

function addToCart(context) {
	let $ = jqdom(context.body);
	let form = $('#product_addtocart_form');

	let url = form.attr('action');

	let token = $('[name=token]').val();
	let productId = $('[name=product]').val();
	let size = 49;

	let data = `token=${token}&isajax=yes&release2=yes&product=${productId}&super_attribute[185]=${size}&qty=1`;

	return context.curl.post(url, data);
}
