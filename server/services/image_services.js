const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../helpers');
const config = require('../config');

const image_upload = multer({
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