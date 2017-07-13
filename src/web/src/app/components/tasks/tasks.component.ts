import {
    Component,
	OnInit,
    OnDestroy,
} from '@angular/core';

import {
	Observable,
	BehaviorSubject
} from 'rxjs';

import { run } from './../../../js/run';

import Config  from './../../models/config';
import Context from './../../models/context';
import { ContextService } from './../../services/context.service';
import { PayService } from '../../services/pay.service';

import { ActivatedRoute, Router } from '@angular/router';

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
        private payService: PayService,
        private router: Router,
    ) { }


	ngOnInit() {
		this.contextService.getContext()
			.subscribe(context => {
                this.context = context
            });
		this.bindEventHandlers();
    }

	ngOnDestroy() {
		if (!electron) {
			return;
		}
        const ipcRenderer = electron.ipcRenderer;

        ipcRenderer.removeAllListeners('log');
        ipcRenderer.removeAllListeners('error');
        ipcRenderer.removeAllListeners('result');
        ipcRenderer.removeAllListeners('status');
	}

	bindEventHandlers() {
        let self = this;
		if (!electron) {
			return;
		}

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
                // if (config.status === 'success') {
				config.payPage = data.bodyPath;
                // }
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
		run({
            command: 'run',
            context: this.context,
        });
	}

	showPay(config) {
        console.log('showPay', config.payPage);
        config.payCount = (config.payCount || 0) + 1;
        this.router.navigate([{
			outlets: {
				popup: ['pay', {
					payBodyPath: config.payPage,
				},],
			},
		}]);

        this.payService.bodyPathSubject.next(config.payPage);
	}

}
