import { Component, OnInit } from '@angular/core';

import User from './../../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = {};

	constructor() { }

	ngOnInit() {
	}

	login() {
		if (!this.validate(true)) {
			return;
		}

		alert('login:' + this.user.name);
    }

    register() {
		if (!this.validate(true)) {
			return;
		}

        alert('register:' + this.user.name);
	}

    validate(showTip: boolean = false): boolean {
        let user = this.user;
        let result = user.name &&
			user.password;

		if (!result && showTip) {
			alert('name and password is required');
		}

        return result;
    }

}
