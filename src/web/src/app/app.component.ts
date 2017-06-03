import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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
    configsObservable: Observable<any[]>;

    theObserver;

	constructor() {
		this.configsObservable = Observable.create(observer => {
			console.log('Hello');
			this.theObserver = observer;
            this.theObserver.next(this.configs);
        });

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
            let self = this;
			setTimeout(function() {
				console.log('got status:', data);
				let config = self.configsDic[data.id];
				config.status = data.status;
				self.status = data.status;
                self.theObserver.next(this.configs);
			});
            // this.configs = this.configs.map(config => config);
		});



	}

    run() {
        this.status = 'start...';
        this.configs = this.getConfigs();
		this.initConfigsDic();
        this.theObserver.next(this.configs);

        let config = {
			userName: 'zs',
			// win: remote.getCurrentWindow(),
			instanceConfigs: this.configs,
		};

		run(config);
    }

    refresh() {
        this.status = 'refresh...';
        this.theObserver.next(this.configs);
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
