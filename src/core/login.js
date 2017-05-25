let jqdom = require('jqdom');

exports.login = login;

function login(context) {
	context.status = '登录...';

	let $ = jqdom(context.body);
	let form = $('#form-validate');

	let url = form.attr('action');

	let userName = context.userName;
	let password = context.password;
	let data = `login[username]=${userName}&login[password]=${password}`;

	return context.curl.post(url, data);
}
