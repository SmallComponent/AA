import { Config } from './config';

let lodash = require('./../../js/libs/lodash/lodash');

export class Context {
	configsDic = {};

	constructor(
		public userName: string = 'anonymous',
		public status: string = '',
		public startTime?: number,
		public timeSpan: number = 0,
		public isRuning: boolean = false,
		public instanceConfigs: Config[] = [],
	) { }

	public getConfigById(id): Config {
		return lodash.find(
			this.instanceConfigs,
			config => config.id === id
		);
	}
}
