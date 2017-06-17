import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import {Location}               from '@angular/common';

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

    user: User = new User('', '');

	constructor(
		private userService: UserService,
        private router:Router,
        private location:Location		
	) { }

	ngOnInit() {
	}

	login() {
		if (!this.user.validate(true)) {
			return;
		}

		this.userService
			.login(this.user)
			.subscribe(result => {
				console.log('login result:' + JSON.stringify(result);
				let userData = result[0];
				if(userData){
					this.user.accountLimit = userData.accountLimit;
					this.userService.setUser(this.user);
					this.router.navigate(['/tasks']);
				}
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
