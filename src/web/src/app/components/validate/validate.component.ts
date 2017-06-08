import { Component, OnInit, OnDestroy } from '@angular/core';

import $ from './../../../js/libs/jquery/jquery';
import initGeetest from './../../../js/libs/gt/gt';
import { run } from './../../../js/run';

import Config  from './../../models/config';
import Context from './../../models/context';
import {ContextService} from './../../services/context.service';

@Component({
	selector: 'app-validate',
	templateUrl: './validate.component.html',
	styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit, OnDestroy {

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
		var self = this;
		const ipcRenderer = electron.ipcRenderer;

		ipcRenderer.on('taskResult', (event, data) => {
			console.log('taskResult:', data);
			let result = data.result;
			self.captchaData = JSON.stringify(result);

			initGeetest({
				gt: result.gt,
				challenge: result.challenge,
				offline: !result.success,
				new_captcha: result.new_captcha,

				product: 'float',
				width: '300px'
			}, function listenCaptcha(captchaObj) {
				captchaObj.appendTo('#captcha');
				captchaObj.onReady(function() {
					$('#wait').hide();
				});
				captchaObj.onSuccess(function() {
					var validateData = captchaObj.getValidate();
					// self.context.instanceConfigs[0].validateData = validateData;
					var dataString = JSON.stringify(validateData, null, 4);
					$('#captchaValidateData').val(dataString);
				});
			});
		});
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
