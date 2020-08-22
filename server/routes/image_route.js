const koaRouter = require("koa-router");
const validator = require('../controllers/image_validator');
const image_controller = require('../controllers/image_controller');
const router = new koaRouter({prefix: '/api/image'});
const cors = require('@koa/cors');

const corsOptions = {
    allowMethods: 'GET,POST,OPTIONS'
}

router.use(cors(corsOptions));

const errString = (err) => {
    let string = "";
    for(const key in err) {
        string += err[key];
    }
    return string;
};

router.post('/upload', validator, async (ctx) => {
    if (!ctx.form.isValid) {
        console.log(ctx.form.errors.message);
        return ctx.sendResponse(422, {errors: [{title: 'Image Upload Error', detail: errString(ctx.form.errors)}]});
    }
    try {
        const file = ctx.request.files.image;
        const res = await image_controller.uploadImage(file, ctx.request.body.description);

        return ctx.sendResponse(200, {
            "message": "uploaded successfully",
            "data": res
        });
    } catch (err) {
        return ctx.sendResponse(500, {errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
})

router.post('/fetchResult', async (ctx) => {
    try {
        const res = await image_controller.getDataByDetails(ctx.request.body);

        return ctx.sendResponse(200, {
            "message": "success",
            "data": res
        });
    } catch (err) {
        return ctx.sendResponse(500, {errors: [{title: 'Error while getting data', detail: err.message}]});
    }
});

module.exports = router;