import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import User from './../models/user';

@Injectable()
export class UserService {

	constructor(private http: Http) { }

	login(user: User): Promise<boolean> {
		return Promise.resolve(true);
	}

	register(user: User): Promise<boolean> {
		return Promise.resolve(true);
	}

}
