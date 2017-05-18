;
(function() {
	var userName = 'abc@163.com';
	var password = 'abc123';

	var loginUrl = 'https://www.adidas.com.cn/customer/account/login/';
	//'http://localhost/git/Home/'; // 'https://www.baidu.com/'; //
	let productUrl = 'http://www.adidas.com.cn/cg5804';

	let size = '42';

	openLogin(loginUrl);

	return void(0);

	function openLogin(url) {
		var webdriver = require('selenium-webdriver');
		var By = webdriver.By;
		var until = webdriver.until;

		var driver = new webdriver.Builder()
			.forBrowser('chrome')
			.build();

		driver.get(url);

		driver.findElement(By.id('email')).sendKeys(userName);
		driver.findElement(By.id('pass')).sendKeys(password);

		driver.findElement(By.id('send2')).click();

		driver.wait(until.urlMatches(/^http:\/\/www\.adidas\.com\.cn\//i), 10);

		driver.navigate().to(productUrl);

		driver.wait(until.urlMatches(/^http:\/\/www\.adidas\.com\.cn\/cg5804/i), 10).then(function() {
			driver.findElement(By.className('optionAll')).then(function(optionAll) {
				driver.findElement(By.id('attribute185')).then(function(sizeInput) {
					console.log(sizeInput, optionAll);
				});
			});

		});


		// choseSize(size);



		// driver.quit();
	}

	// return void(0);

	// function choseSize(size) {
	// 	if(isSealout()) {
	// 		console.log('sealout');
	// 		return;
	// 	}
	//
	// 	// let token = getToken();
	// 	//
	// 	// let data = getAddCartData(size);
	// 	// let addCartUrl = getAddCartUrl();
	// 	// return Promise.resolve({
	// 	// 		addCartUrl,
	// 	// 		data
	// 	// 	})
	// 	// 	.then(addToCart)
	// 	// 	.then(submitOrder);
	// }
	//
	// function isSealout() {
	// 	return getForm().length === 0;
	// }
	//
	// function getForm() {
	// 	// return $('#product_addtocart_form');
	// }

})();
