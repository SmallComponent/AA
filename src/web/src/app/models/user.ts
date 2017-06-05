export default class User {

	constructor(
		public name: string,
		public password: string
	) { }

	validate(showTip: boolean = false): boolean {
        let result = !!(
			this.name &&
			this.password
		);

		if (!result && showTip) {
			alert('name and password is required');
		}

        return result;
    }

}
