const s3 = require('./s3_client').getS3Client;
const constants = require('./constants');

// The name of the bucket that you have created
const BUCKET_NAME = constants.BUCKET_NAME;

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