;
(function() {
	var userName = 'abc@163.com';
	var password = 'abc123';

	var loginUrl = 'https://www.adidas.com.cn/customer/account/login/'; // 'https://www.baidu.com/'; //

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
