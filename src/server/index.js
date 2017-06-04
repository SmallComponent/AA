const koaStatic = require('koa-static');
const Koa = require('koa');

const app = new Koa();

var router = require('koa-router')();

router.get('/hi', function(ctx, next) {
	ctx.body = 'Hello World!';
	next();
});

app
	.use(router.routes())
	.use(router.allowedMethods())
	.use(koaStatic('./static'));

app.listen(3000);
console.log('listening on port 3000');
