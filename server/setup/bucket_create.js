const s3 = require('../helpers/s3').getS3Client;
const config = require('../config');

const BUCKET_NAME = config.BUCKET_NAME;

const params = {
    Bucket: BUCKET_NAME,
    // CreateBucketConfiguration: {
    //     // Set your region here
    //     LocationConstraint: "us-east-1"
    // }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});