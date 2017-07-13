import { Injectable } from '@angular/core';

import Rx from 'rxjs';

@Injectable()
export class PayService {
	public bodyPathSubject;

	constructor() {
		this.bodyPathSubject = new Rx.BehaviorSubject('');
	}
}
