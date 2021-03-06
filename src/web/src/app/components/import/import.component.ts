import { Component, OnInit, OnDestroy } from '@angular/core';

import csvjson from './../../../js/libs/csvjson/index';

import Config  from './../../models/config';
import Context from './../../models/context';
import {ContextService} from './../../services/context.service';

const csvHeader = `userName,password,productUrl,size,proxy,proxyUserName,proxyPassword,status`;
const example = `abc@163.com,abc123,http://www.adidas.com.cn/cg5804,42,http://61.191.41.130:80,,`;

@Component({
	selector: 'app-import',
	templateUrl: './import.component.html',
	styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit, OnDestroy {

	private defaultInputs = `${csvHeader}
${example}`;

	captchaData: string;

	context: Context = new Context();

	constructor(
		private contextService: ContextService,
	) { }

	ngOnInit() {
		this.contextService.getContext()
			.subscribe(context => {
				this.context = context;
				let configsCopy = JSON.parse(JSON.stringify(context.instanceConfigs));
				configsCopy.forEach(config => delete config.id);
				this.defaultInputs = this.toCsv(configsCopy);
			});
	}

	ngOnDestroy() { }

	import() {
		try {
			let configs = this.fromCsv(this.defaultInputs);
			configs.forEach((config, index) => config.id = index + 1);
			this.context.instanceConfigs = configs;
			this.contextService
				.saveContext(this.context)
				.subscribe(
				isSuccess => alert('save ' + (isSuccess ? 'success' : 'failed')),
				err => alert('error: ' + JSON.stringify(err)),
			);
		} catch (error) {
			console.error(error);
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
