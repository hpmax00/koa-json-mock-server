var koa = require('koa');
var Router = require('koa-router');
var jsonServer = require('koa-json-mock-server');
var jsonBody = require('koa-json-body');

const app = new koa()

var koaRouter = new Router();

app.use(jsonBody());
app.use(jsonServer(__dirname + '/db'));

koaRouter.get('/hello', function *(next) {
  this.body = 'Hello World!';
});

app.use(koaRouter.routes());

app.listen(3000);
