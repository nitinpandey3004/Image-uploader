module.exports = {

    PORT: process.env.PORT || 3000,
    AWS_S3_CREDENTIALS_PROFILE: "image_handler",
    BUCKET_NAME: "co-image-bucket-2",

    DB_DETAILS: {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: 'root',
        DATABASE: 'co_image',
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    MAX_FILE_SIZE_ALLOWED: 0.5 * 1024 * 1024
}