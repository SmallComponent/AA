import { Component, OnInit } from '@angular/core';

import json2csv from './json2csv';
import csvjson from './csvjson';

import { Config } from './../../models/config';
import { Context } from './../../models/context';
import { ContextService } from './../../services/context.service';

const csvHeader = `userName,password,productUrl,size,proxy,proxyUserName,proxyPassword`;

@Component({
	selector: 'app-import',
	templateUrl: './import.component.html',
	styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

	defaultInputs = `${csvHeader}
abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://61.191.41.130:80,,`;

	constructor(
		private contextService: ContextService,
	) { }

	ngOnInit() {
		this.contextService.getContext()
			.then(context => {
				this.defaultInputs = csvjson.toCSV(context.instanceConfigs);
			});
	}

	toCsv(obj) {
		let option = this.getOption();
		return csvjson.toCSV(obj, option);
	}

	fromCsv(csv) {
		let option = this.getOption();
		return csvjson.toObject(csv, option);
	}

	getOption() {
		return {
			headers: csvHeader,
			delimiter: ',',
			quote: '"',
			wrap: false,
			ignoreDenote: true,
		};
	}

	import() {
		console.log(this.defaultInputs);
	}

}
