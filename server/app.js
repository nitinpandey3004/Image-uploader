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

const server = app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.use(image_route.routes());

module.exports = server;