const s3 = require('../helpers/s3').getS3Client;
const db = require("../models");
const Image_Details = db.image_details;
const config = require('../config');
const fs = require("fs");

const image_upload = async ({fileName, filePath, fileType}) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath);
        stream.on("error", function (err) {
            reject(err);
        });
        s3.upload({
            ACL: 'public-read',
            Bucket: config.BUCKET_NAME,
            Body: stream,
            ContentType: fileType,
            Key: Date.now().toString() + "_" + fileName
        }, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve({key: data.Key, url: data.Location});
            }
        });
    });
};

const deleteObject = (fileName, cb) => {
    s3.deleteObjects({
        Bucket: config.BUCKET_NAME,
        Delete: {
            Objects: [{
                Key: fileName
            }]
        }
    }, (err, data) => {
        if (err) {
            return cb(err);
        }
        return cb(null);
    })
};

const update_db = (imageDetails) => {
    return new Promise((resolve, reject) => {
        const fileDetails = {
            fileName: imageDetails.key,
            description: imageDetails.description,
            size: imageDetails.size,
            fileType: imageDetails.fileType,
            url: imageDetails.url,
        };
        Image_Details.create(fileDetails).then((data) => {
            return resolve(data.id);
        }).catch((err) => {
            //revert s3 upload
            deleteObject(fileDetails.fileName, () => {
                return reject(err);
            });
        })
    })
};

const deleteDetails = (id) => {
    return new Promise((resolve, reject) => {
        Image_Details.destroy({
            where: {
                id: id
            }
        }).then((data) => {
            return resolve("deleted");
        }).catch((err) => {
            return reject(err);
        })
    })
};

const getAllData = (conditionObj) => {
    return new Promise((resolve, reject) => {
        console.log(conditionObj);
        Image_Details.findAll({
            where: conditionObj,
            attributes: ["id", "fileName", "description", "size", "fileType", "url"]
        }).then((imageDetails) => {
            resolve(imageDetails);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports = {
    image_upload: image_upload,
    deleteObject: deleteObject,
    update_db: update_db,
    getAllData: getAllData,
    deleteDetails: deleteDetails
}