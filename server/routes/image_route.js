const express = require('express');
const image_controller = require('../controllers/image_controller');
const router = express.Router();

router.get('/upload', (req, res) => {
    image_controller.uploadImage((err, data) => {
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