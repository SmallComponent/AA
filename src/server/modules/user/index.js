module.exports = {
	register,
	login,
};

const dbName = 'AA';
const collectionName = 'users';

function register(ctx, next) {
	let user = ctx.request.body.data;

	return ctx.mongo
		.db(dbName)
		.collection(collectionName)
		.save(user)
		.then(result => ctx.body = {
			data: result.result.ok,
		});
}

function login(ctx, next) {
	let user = ctx.request.body.data;

	return ctx.mongo
		.db(dbName)
		.collection(collectionName)
		.find(user)
		.toArray()
		.then(users => ctx.body = {
			data: users,
		});
}
