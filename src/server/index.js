const koaStatic = require('koa-static');
const Koa = require('koa');

const app = new Koa();

app.use(koaStatic('./static'));

app.listen(3000);
console.log('listening on port 3000');
