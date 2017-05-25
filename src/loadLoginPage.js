exports.loadLoginPage = loadLoginPage;

function loadLoginPage(context) {
	context.status = '加载登录页面...';
	let loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	return context.curl.get(loginUrl);
}
