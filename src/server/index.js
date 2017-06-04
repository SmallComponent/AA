const koaStatic = require('koa-static');
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app
	.use(router.routes())
	.use(router.allowedMethods())
	.use(koaStatic('./static'));

app.listen(3000);
console.log('listening on port 3000');
