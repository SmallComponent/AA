var router = require('koa-router')();

router.get('/hi', function(ctx, next) {
	ctx.body = 'Hello World!';
	next();
});

module.exports = router;
