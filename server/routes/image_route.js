const express = require('express');
const image_controller = require('../controllers/image_controller');
const image_services = require('../services/image_services');
const router = express.Router();

const uploader = image_services.image_upload.single('image');

router.post('/upload', (req, res) => {
    uploader(req, res, (err, data) => {
        console.log("here");
        if(err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        return res.json({
            "message": "uploaded successfully",
            "url": data.url
        });
    });
})


module.exports = router;