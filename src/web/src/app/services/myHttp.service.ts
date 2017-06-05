import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MyHttpService {

	constructor(
		public url: string
	) { }


}
