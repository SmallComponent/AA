import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MyHttpService {

	constructor(
		protected api: string,
		protected http: Http
	) { }

	protected postData(subApi, data) {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({ headers: headers });

		return this.http
			.post(`${this.api}${subApi}`, {
				data,
			}, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	protected extractData(response: Response) {
		let body = response.json();
		return body.data;
	}

	protected handleError(error: Response | any) {
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
