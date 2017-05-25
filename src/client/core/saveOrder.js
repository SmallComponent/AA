let jqdom = require('jqdom');

exports.saveOrder = saveOrder;

function saveOrder(context) {
	context.status = '提交订单...';

	let $ = jqdom(context.body);
	let form = $('#co-shipping-form');

	let url = form.attr('action');

	let data = form.find('[name]')
		.map(function(index, input) {
			$input = $(input);

			var key = $input.attr('name');
			let value = $input.val();

			if($input.is('select')) {
				value = $input.children('option[selected]').val();
			} else if(ignoreFields($input, key)) {
				value = null;
			}

			if(value) {
				return [key, value].join('=');
			}
		})
		.toArray()
		.join('&');

	return context.curl.post(url, data);

	// return void(0);

	function ignoreFields($input, key) {
		return $input.is('[type="radio"]:not([checked])') ||
			/^fapiao/i.test(key) ||
			/yancheckout_page/i.test(key);
	}
}
