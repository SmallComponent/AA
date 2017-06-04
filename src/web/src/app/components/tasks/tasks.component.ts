import {
    Component,
	OnInit
} from '@angular/core';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import { run } from './run';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	isRuning = false;

	status = '';
	start: number | string = '';
	timeSpan: number | string = '';

	configs = [];
	configsDic = {};

	timer = Observable.interval(100);

	constructor() {
		this.bindEventHandlers();
	}


	ngOnInit() { }


	bindEventHandlers() {
		const ipcRenderer = electron.ipcRenderer;

		ipcRenderer.on('log', (event, data) => {
			console.log('got log:', data);
		});
		ipcRenderer.on('error', (event, data) => {
			console.log('got error:', data);
		});
		ipcRenderer.on('result', (event, data) => {
			console.log('got result:', data);
			if (data.action === 'done') {
				this.timeSpan = Date.now() - this.start;
				// $('#run').removeAttr('disabled');
				this.isRuning = false;
			}
		});

		ipcRenderer.on('status', (event, data) => {
			console.log('got status:', data);
			let config = this.configsDic[data.id];
			config.status = data.status;
			this.status = data.status;
		});
	}

	run() {
		this.isRuning = true;
		// $('#run').attr('disabled', 'disabled');
		this.start = Date.now();

		this.status = 'start...';
		this.configs = this.getConfigs();
		this.initConfigsDic();

		let config = {
			userName: 'zs',
			// win: remote.getCurrentWindow(),
			instanceConfigs: this.configs,
		};

		run(config);
	}

	initConfigsDic() {
		let configsDic =
			this.configsDic = {};
		this.configs.forEach(
			config => configsDic[config.id] = config
		);
	}

	getConfigs() {
		return [{
			id: 1,
			userName: 'abc@163.com',
			password: 'abc123',
			productUrl: 'http://www.adidas.com.cn/cg5804',
			size: 42,
			proxy: 'http://61.191.41.130:80',
			proxyUserName: null,
			proxyPassword: null,
			status: 'xxx',
		}, {
				id: 2,
				userName: 'abcd@163.com',
				password: 'abcd163',
				productUrl: 'http://www.adidas.com.cn/cg5804',
				size: 42,
				proxy: 'http://61.191.41.130:80',
				proxyUserName: null,
				proxyPassword: null,
			}];
	}

}
