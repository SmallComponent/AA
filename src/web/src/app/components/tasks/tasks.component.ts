import {
    Component,
	OnInit
} from '@angular/core';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import { run } from './run';

import { Context } from './../../models/context';
import { ContextService } from './../../services/context.service';

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
    context: Context;

	private configsDic = {};

	timer = Observable.interval(100);

	constructor(
        private contextService: ContextService,
    ) {
		this.bindEventHandlers();
	}


	ngOnInit() {
		this.contextService.getContext()
			.then(context => {
                this.context = context
                this.initConfigsDic();
            });
    }


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

    getConfigs() {
        return this.context && this.context.instanceConfigs
			|| [];
    }

	run() {
		this.isRuning = true;
		this.start = Date.now();
		this.status = 'start...';
		run(this.context);
	}

	initConfigsDic() {
		let configsDic =
			this.configsDic = {};
		this.context.instanceConfigs.forEach(
			config => configsDic[config.id] = config
		);
	}

}
