import { Component, OnInit } from '@angular/core';

import csvjson from './csvjson';

import { Config } from './../../models/config';
import { Context } from './../../models/context';
import { ContextService } from './../../services/context.service';

const csvHeader = `id,userName,password,productUrl,size,proxy,proxyUserName,proxyPassword,status`;
const example = `abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://61.191.41.130:80,,`;

@Component({
	selector: 'app-import',
	templateUrl: './import.component.html',
	styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

	defaultInputs = `${csvHeader}
${example}`;

	private context: Context;

	constructor(
		private contextService: ContextService,
	) { }

	ngOnInit() {
		this.contextService.getContext()
			.then(context => {
				this.context = context;
				this.defaultInputs = this.toCsv(context.instanceConfigs);
			});
	}

	import() {
		try {
			let configs = this.fromCsv(this.defaultInputs);
			console.log(configs);
			this.context.instanceConfigs = configs;
		} catch (ex) {
			alert('请检查csv格式，若值中有“，”需要使用双引号');
		}
	}

	toCsv(obj) {
		let option = this.getOption();
		return csvjson.toCSV(obj, option);
	}

	fromCsv(csv) {
		return csvjson.toObject(csv);
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
}
