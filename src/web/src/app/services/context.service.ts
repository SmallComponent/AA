import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Config} from './../models/config';
import {Context} from '../models/context';

@Injectable()
export class ContextService {
	private getConfigsUrl = `./configs`;

	constructor(private http: Http) { }

	getContext(): Observable<Context> {
		// return Promise.resolve(context);

		return this.http
			.get(this.getConfigsUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}
	private extractData(response: Response) {
		let context = new Context('abc163');

		let body = response.json();
		let configs = body.data || [];
		context.instanceConfigs = configs;

		return context;
	}
	private handleError(error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}

let context = new Context('zs');
context.instanceConfigs = [{
	id: 1,
	userName: 'abc@163.com',
	password: 'abc123',
	productUrl: 'http://www.adidas.com.cn/cg5804',
	size: 42,
	proxy: 'http://61.191.41.130:80',
	proxyUserName: '',
	proxyPassword: '',
	status: 'xxx',
}, {
		id: 2,
		userName: 'abcd@163.com',
		password: 'abcd163',
		productUrl: 'http://www.adidas.com.cn/cg5804',
		size: 42,
		proxy: 'http://61.191.41.130:80',
		proxyUserName: null,
		proxyPassword: null,
	},];
