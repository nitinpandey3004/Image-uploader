const datalize = require('datalize');
const field = datalize.field;
const config = require('../config');

module.exports = datalize([
    field('image').file()
        .required()
        .size(config.MAX_FILE_SIZE_ALLOWED)
        .mime(['image/jpeg', 'image/png']),
    field('description').trim().required(),
])