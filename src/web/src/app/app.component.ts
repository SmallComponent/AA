import { Component } from '@angular/core';

import {run} from './run';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'app works!';

    configs = [];

    run() {
        this.configs = this.getConfigs();
        let config = {
			userName: 'zs',
			// win: remote.getCurrentWindow(),
			instanceConfigs: this.configs,
		};

		run(config);
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
