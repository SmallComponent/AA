import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from './../models/config';
import Context from '../models/context';

@Injectable()
export class ContextService {
	private getConfigsUrl = `./configs`;

	constructor(private http: Http) { }

	saveContext(context): Observable<boolean> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({ headers: headers });
		let data = { data: context.instanceConfigs };

		return this.http
			.post(this.getConfigsUrl, data, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getContext(): Observable<Context> {
		// return Promise.resolve(context);

		return this.http
			.get(this.getConfigsUrl)
			.map(this.extractData)
			.map(this.convertToContext)
			.catch(this.handleError);
	}

	private convertToContext(configs): Context {
		let context = new Context('abc163');
		context.instanceConfigs = configs || [];
		return context;
	}

	private extractData(response: Response) {
		let body = response.json();
		return body.data;
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
