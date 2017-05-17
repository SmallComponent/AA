;
(function() {
	var userName = 'abc@163.com';
	var password = 'abc123';

	var loginUrl = 'http://www.baidu.com/'; // 'https://www.adidas.com.cn/customer/account/login/';

	openLogin(loginUrl);

	return void(0);

	function openLogin(url) {
		var page = require('webpage').create();
		page.open(url, function(status) {
			console.log("Status: " + status);
			if(status === "success") {}
			page.render('example.png');

			phantom.exit();
		});
	}

})();
