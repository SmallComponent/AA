import { Component, OnInit } from '@angular/core';

import User from './../../models/user';
import UserService from '../../services/context.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User('', '');

	constructor(private userService: UserService) { }

	ngOnInit() {
	}

	login(): boolean {
		if (!this.user.validate(true)) {
			return;
		}

		return UserService.login(user)
			.then(result => {
				alert('login:', result);
				return result;
			});
	}
	register(): boolean {
		if (!this.user.validate(true)) {
			return;
		}

		return UserService.register(user)
			.then(result => {
				alert('register:', result);
				return result;
			});
	}

}
