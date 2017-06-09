import { Component, OnInit, OnDestroy } from '@angular/core';

import initGeetest from './../../../js/libs/gt/gt';
import { run } from './../../../js/run';

import Config  from './../../models/config';
import Context from './../../models/context';
import {ContextService} from './../../services/context.service';

@Component({
	selector: 'app-validate',
	templateUrl: './validate.component.html',
	styleUrls: ['./validate.component.css'],
})
export class ValidateComponent implements OnInit, OnDestroy {

	captchaData = '';
	captchaValidateData = '';
	showWaiting = true;
	context = new Context();
	currentIndex = 0;

	constructor(
        private contextService: ContextService,
    ) { }

	ngOnInit() {
		this.initValidateHandler();

		const prepareValidate = this.prepareValidate;
        this.contextService.getContext()
            .subscribe(context => {
                this.context = context;
				context.instanceConfigs.forEach(prepareValidate);
            });
	}

	ngOnDestroy() {
		const ipcRenderer = electron.ipcRenderer;

		ipcRenderer.removeAllListeners('taskResult');
	}

    initValidateHandler() {
		const ipcRenderer = electron.ipcRenderer;
		ipcRenderer.on('taskResult', (event, data) => {
			console.log('taskResult:', data);
			this.showValidate(data);
		});
	}

	showValidate(data) {
		const result = data.result;
		this.captchaData += JSON.stringify(result);
		this.showGeTest(result);
	}

	showGeTest(gtInfo) {
		initGeetest({
			gt: gtInfo.gt,
			challenge: gtInfo.challenge,
			offline: !gtInfo.success,
			new_captcha: gtInfo.new_captcha,

			product: 'float',
		}, captchaObj => this.listenCaptcha(captchaObj));
	}

	listenCaptcha(captchaObj) {
		captchaObj.appendTo('#captcha');
		captchaObj.onReady(() => this.hideWating());
		captchaObj.onSuccess(() => this.handleValidateResult(captchaObj));
	}

	handleValidateResult(captchaObj) {
		var validateData = captchaObj.getValidate();

		const config = this.context.instanceConfigs[this.currentIndex++]; // this.context.getConfigById();
		config.validateData = validateData;

		var dataString = JSON.stringify(validateData, null, 4);
		this.captchaValidateData += dataString;
	}

	hideWating() {
		this.showWaiting = false;
	}

	prepareValidate(config, index) {
		run({
			command: 'getValidate',
			context: {
                id: config.id,
                index: index,
            },
		});
	}

}
