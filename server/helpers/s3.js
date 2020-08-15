const AWS = require('aws-sdk');

//creds
const credentials = new AWS.SharedIniFileCredentials({profile: 'image_handler'});

const getS3Client = new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

module.exports = {
    getS3Client: getS3Client
};