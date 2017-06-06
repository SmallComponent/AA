import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MyHttpService {

	jsonHeaderOption;

	constructor(
		protected api: string,
		protected http: Http
	) {
		this.jsonHeaderOption = this.createJsonHeaderOption();
	}

	protected get(subApi) {
		return this.http
			.get(`${this.api}${subApi}`)
			.map(this.extractData)
			.catch(this.handleError);
	}

	protected postData(subApi, data) {
		return this.http
			.post(`${this.api}${subApi}`, {
				data,
			}, this.jsonHeaderOption)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private createJsonHeaderOption() {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return new RequestOptions({
			headers
		});
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
