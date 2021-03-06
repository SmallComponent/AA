import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import User from './../models/user';

import { MyHttpService } from './myHttp.service';

@Injectable()
export class UserService extends MyHttpService {
	user: User = new User('', '');
	constructor(
		protected http: Http
	) {
		super('./users', http);
	}

	login(user: User): Observable<boolean> {
		return this.postData('/login', user);
	}

	register(user: User): Observable<boolean> {
		return this.postData('/register', user);
	}

	setUser(user){
		this.user = user;
	}

	getUser(){
		return this.user;
	}

}
