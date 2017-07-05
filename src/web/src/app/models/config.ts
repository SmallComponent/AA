export default class Config {
    constructor(
		public id: number,
		public userName: string,
		public password: string,
		public productUrl: string,
		public size: number,
		public proxy: string,
		public proxyUserName?: string | null,
		public proxyPassword?: string | null,
		public status?: string | null,
        public payPage?: string | null,
    ) { }
}
