const bodyParser = require('koa-body');
const image_route = require('./routes/image_route.js');
const Koa = require('koa');

const app = new Koa();


// helper for returning errors in routes
app.context.sendResponse = function (code, obj) {
    this.status = code;
    this.body = obj;
};

app.use(bodyParser({
    enableTypes: ['json', 'form'],
    multipart: true,
    formidable: {
        maxFileSize: 32 * 1024 * 1024,
    }
}));
// app.use(express.static(path.join(__dirname, '/../dist/co-image')));
// app.use('/home', express.static(path.join(__dirname, '/../dist/co-image')));
// app.use('/upload', express.static(path.join(__dirname, '/../dist/co-image')));
// const router = new Router();
// router.get('/home', async ctx => koaSend(ctx, ctx.path, {
//     root: serveBase,
//     immutable: true,
//     maxAge: oneYearMs,
// }));
// router.get('/favicon.ico', async ctx => koaSend(ctx, ctx.path, {
//     root: serveBase,
//     maxAge: oneDayMs,
// }));
// app.use(serve({
//     rootDir: path.join(__dirname, '/../dist/co-image'),
// }));

const server = app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.use(image_route.routes());

module.exports = server;