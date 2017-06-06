import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import User from './../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User('x', 'x');

	constructor(
		private userService: UserService
	) { }

	ngOnInit() {
	}

	login(): Promise<boolean> {
		if (!this.user.validate(true)) {
			return;
		}

		return this.userService.login(this.user)
			.then(result => {
				alert('login:' + result);
				return result;
			});
	}
	register(): Observable<boolean> {
		if (!this.user.validate(true)) {
			return;
		}

		return this.userService
			.register(this.user)
			.subscribe(result => {
				alert('register:' + result);
				return result;
			});
	}

}
