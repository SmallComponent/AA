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
					alert('登录成功');
					this.user.accountLimit = userData.accountLimit;
					this.userService.setUser(this.user);
					this.router.navigate(['/tasks']);
				}else{
					alert('用户名或密码错误');
				}

				return result;
			});
	}
	register() {
		if (!this.user.validate(true)) {
			return;
		}

		this.userService
			.register(this.user)
			.subscribe(result => {
				if(result){
					alert('注册成功');
				}
				else{
					alert('用户名已存在');
				}
			});
	}

}
