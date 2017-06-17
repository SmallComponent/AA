const koaStatic = require('koa-static');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaMongo = require('koa-mongo');
const app = new Koa();

const router = require('./router');

const path = require('path');

const mongoOption = {
	// uri: 'mongodb://admin:123456@localhost:27017/test', //or url
	uri: 'mongodb://localhost:27017/aa',
	max: 100,
	min: 1,
};

app
	.use(koaBody())
	.use(koaMongo(mongoOption))
	.use(router.routes())
	.use(router.allowedMethods())
	.use(koaStatic(path.join(__dirname, './static')));

app.listen(3000);
console.log('listening on port 3000');
