const AWS = require('aws-sdk');
const config = require('../config');

//creds
const credentials = new AWS.SharedIniFileCredentials({profile: config.AWS_S3_CREDENTIALS_PROFILE});

const getS3Client = new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

module.exports = {
    getS3Client: getS3Client
};