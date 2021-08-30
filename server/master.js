const Koa = require('koa');
const koaBody = require('koa-body');
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

//app.use(session(SESS_CONFIG, app));

app.use(async (ctx, next) => {
    if(!isProduction) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
        ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
    }
    if(ctx.method == 'OPTIONS') {
        ctx.response.status = 204;
        return
    }
    await next();
});

app.use(async (ctx, next) => {
    if(!isProduction) console.log(`Receive connect on: ${ctx.request.method} ${ctx.request.url}.`);
    await next();
});

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024
    }
}));

app.use(controller());

app.listen(8080);
console.log('Server run on port 8080!');
console.log(isProduction)