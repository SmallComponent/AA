import { Component, OnInit } from '@angular/core';

import User from './../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User('', '');

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
	register(): Promise<boolean> {
		if (!this.user.validate(true)) {
			return;
		}

		return this.userService.register(this.user)
			.then(result => {
				alert('register:' + result);
				return result;
			});
	}

}
