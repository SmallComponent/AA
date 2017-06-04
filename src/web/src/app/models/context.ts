import { Config } from './config';

export class Context {
	constructor(
		public userName: string,
		public instanceConfigs: Config[],
	) { }
}
