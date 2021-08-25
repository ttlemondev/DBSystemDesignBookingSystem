const Koa = require('koa');
const controller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';
const session = require('koa-session');
const app = new Koa();

app.keys = ['SEC'];
const SESS_CONFIG = {
    key: 'koa:sess',
    maxAge: 1000 * 60 * 30,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(session(SESS_CONFIG, app));

app.use(async (ctx, next) => {
    if(!isProduction) console.log(`Receive connect on: ${ctx.request.method} ${ctx.request.url}.`);
    await next();
});

app.use(controller());

app.listen(8080);
console.log('Server run on port 8080!');