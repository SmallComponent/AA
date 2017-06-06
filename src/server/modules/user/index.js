module.exports = {
	register,
	login,
};

const dbName = 'AA';
const collectionName = 'users';

function register(ctx, next) {
	let user = ctx.request.body.data;
	console.log('register:', ctx.request.body);
	return ctx.mongo
		.db(dbName)
		.collection(collectionName)
		.save(user)
		.then(result => ctx.body = {
			data: result.result.ok,
		});
}

function login(ctx, next) {

}
