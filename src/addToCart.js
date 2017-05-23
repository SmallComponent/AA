exports.addToCart = addToCart;

function addToCart(context) {
	let addCartUrl = 'http://www.adidas.com.cn/checkout/cart/add/';
	let data = `token=b90bff18624d90ad4677124317c6b050&isajax=yes&release2=yes&product=333157&super_attribute%5B185%5D=49&qty=1`;

	return context.curl.post(addCartUrl, data);
}
