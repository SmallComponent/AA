import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import Rx from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from './../models/config';
import Context from '../models/context';

import { MyHttpService } from './myHttp.service';

@Injectable()
export class ContextService extends MyHttpService {

	private contextSubject = new Rx.Subject();

	constructor(
		protected http: Http
	) {
		super('./configs', http);
	}

	saveContext(context): Observable<boolean> {
		this.contextSubject.next(context);
		return this.postData('', context.instanceConfigs);
	}

	getContext(): Observable<Context> {
		this.get('')
			.map(this.convertToContext)
			.subscribe(context=>{
				this.contextSubject.next(context);
		});
		return this.contextSubject;
	}

	private convertToContext(configs): Context {
		let context = new Context('abc163');
		context.instanceConfigs = configs || [];
		return context;
	}

}
