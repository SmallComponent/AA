import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import User from './../models/user';

@Injectable()
export default class UserService {

	constructor(private http: Http) { }

	login(user: User): boolean {

	}
	register(user: User): boolean { }

}
