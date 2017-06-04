import { Injectable } from '@angular/core';

import {Config} from './../models/config';
import {Context} from '../models/context';

@Injectable()
export class ContextService {

	constructor() { }

	getContext(): Promise<Context> {
		return Promise.resolve(CONTEXT);
	}

}

const CONTEXT: Context = {
	userName: 'zs',
	instanceConfigs: [{
		id: 1,
		userName: 'abc@163.com',
		password: 'abc123',
		productUrl: 'http://www.adidas.com.cn/cg5804',
		size: 42,
		proxy: 'http://61.191.41.130:80',
		proxyUserName: '',
		proxyPassword: '',
		status: 'xxx',
	}, {
			id: 2,
			userName: 'abcd@163.com',
			password: 'abcd163',
			productUrl: 'http://www.adidas.com.cn/cg5804',
			size: 42,
			proxy: 'http://61.191.41.130:80',
			proxyUserName: null,
			proxyPassword: null,
		},],
};
