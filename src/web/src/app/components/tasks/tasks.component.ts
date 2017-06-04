import {
    Component,
	OnInit,
    OnDestroy,
} from '@angular/core';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import { run } from './run';

import { Config } from './../../models/config';
import { Context } from './../../models/context';
import { ContextService } from './../../services/context.service';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
    context: Context = new Context();

	timer = Observable.interval(100);

	constructor(
        private contextService: ContextService,
    ) { }


	ngOnInit() {
		this.contextService.getContext()
			.then(context => {
                this.context = context
            });
		this.bindEventHandlers();
    }

	ngOnDestroy() {
        const ipcRenderer = electron.ipcRenderer;

        ipcRenderer.removeAllListeners('log');
        ipcRenderer.removeAllListeners('error');
        ipcRenderer.removeAllListeners('result');
        ipcRenderer.removeAllListeners('status');
	}

	bindEventHandlers() {
        let self = this;

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
				self.context.timeSpan = Date.now() - self.context.startTime;
				self.context.isRuning = false;
			}
		});

		ipcRenderer.on('status', (event, data) => {
			console.log('got status:', data);
			let config = self.context.getConfigById(data.id);
            if (config) {
				config.status = data.status;
			}
            self.context.status = data.status;
		});
	}

    getConfigs(): Config[] {
        return this.context && this.context.instanceConfigs
			|| [];
    }

	run() {
		this.context.isRuning = true;
		this.context.startTime = Date.now();
		this.context.status = 'start...';
		run(this.context);
	}



}
