const express = require('express');
const bodyParser = require('koa-body');
const db = require("./models");
var cors = require('cors')
const image_route = require('./routes/image_route.js');
const config = require('./config');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
app.use(koaBody());
// app.use(cors());

db.sequelize.sync();

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

app.use(image_route.routes());
// app.listen(config.PORT, () => {
//     console.log('App is running!');
// })