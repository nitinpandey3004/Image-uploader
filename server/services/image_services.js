const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../helpers/s3');
const config = require('../config');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}

const image_upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
      s3: s3.getS3Client,
      bucket: config.BUCKET_NAME,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
})

module.exports = {
    image_upload: image_upload
}