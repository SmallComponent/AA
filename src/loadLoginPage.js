exports.loadLoginPage = loadLoginPage;

function loadLoginPage(context) {
	context.status = '登录中...';
	let loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	return context.curl.get(loginUrl);
}
