import { Component } from '@angular/core';

import {run} from './run';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'app works!';

    status = '';

    configs = [];
    configsDic = {};

	constructor() {
		const ipcRenderer = electron.ipcRenderer;
		ipcRenderer.on('log', (event, data) => {
			console.log('got log:', data);
		});
		ipcRenderer.on('error', (event, data) => {
			console.log('got error:', data);
		});
		ipcRenderer.on('result', (event, data) => {
			console.log('got result:', data);
		});

		ipcRenderer.on('status', (event, data) => {
			console.log('got status:', data);
			let config = this.configsDic[data.id];
			config.status = data.status;
			this.status = data.status;
            // this.configs = this.configs.map(config => config);
		});
	}

    run() {
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
				userName: 'abc@163.com',
				password: 'abc123',
				productUrl: 'http://www.adidas.com.cn/cg5804',
				size: 42,
				proxy: 'http://61.191.41.130:80',
				proxyUserName: null,
				proxyPassword: null,
			}];
    }

}
