import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-import',
	templateUrl: './import.component.html',
	styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

	defaultInputs = `userName,password,productUrl,size,proxy,proxyUserName,proxyPassword
abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://61.191.41.130:80,,`;

	constructor() { }

	ngOnInit() {
	}

	import() {
		console.log(this.defaultInputs);
	}

}
