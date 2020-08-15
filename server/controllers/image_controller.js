const image_services = require('../services/image_services');
const allowedFormats = ["image/jpeg", "image/png"];

const uploader = image_services.image_upload.single('image');

const uploadImage = (req, file, cb) => {
    if(!allowedFormats.includes(file.mimeType)) {
        return cb(new Error("File format not supported."), null);
    }
    uploader(req, res, (err) => {
        if(err) {
            return cb(err, null);
        }
        return cb(null, {
            url: req.file.location
        });
    })
}

module.exports = {
    uploadImage: uploadImage,
}