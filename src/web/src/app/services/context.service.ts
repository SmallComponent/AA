import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from './../models/config';
import Context from '../models/context';

import { MyHttpService } from './myHttp.service';

@Injectable()
export class ContextService extends MyHttpService {

	constructor(
		protected http: Http
	) {
		super('./configs', http);
	}

	saveContext(context): Observable<boolean> {
		return this.postData('', context.instanceConfigs);
	}

	getContext(): Observable<Context> {
		return this.get('')
			.map(this.convertToContext);
	}

	private convertToContext(configs): Context {
		let context = new Context('abc163');
		context.instanceConfigs = configs || [];
		return context;
	}

}
