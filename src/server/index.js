const koaStatic = require('koa-static');
const Koa = require('koa');
const router = require('./router');
const koaBody = require('koa-body');

const app = new Koa();

app
	.use(koaBody())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(koaStatic('./static'));

app.listen(3000);
console.log('listening on port 3000');
