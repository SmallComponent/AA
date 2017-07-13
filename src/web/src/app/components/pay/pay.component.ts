import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params }     from '@angular/router';

import { PayService } from '../../services/pay.service';

@Component({
	// selector: 'pay',
	templateUrl: './pay.component.html',
	styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

	payBodyPath = '';

	constructor(
		private route: ActivatedRoute,
		private payService: PayService,
	) { }

	ngOnInit() {
		// this.route.params
		// 	.switchMap((params) => console.log(params));

		// 		.switchMap((value: Params, index: number): <object> => {
		// 			this.payBodyPath = params['payBodyPath'];
		// 	console.log('got bodyPath:', this.payBodyPath);
		// 	return this.payBodyPath;
		// });

		this.route.params
			.switchMap((params: Params) => {
				this.payBodyPath = params['payBodyPath'];
				console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', this.payBodyPath);
				return this.payBodyPath;
			});

		this.payService.bodyPathSubject.subscribe({
			next: (path) => {
				this.payBodyPath = path;
				console.log('nextPath:', path);
			},
		});
	}

}
