const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : config.DB_DETAILS.HOST,
    user     : config.DB_DETAILS.USER,
    password : config.DB_DETAILS.PASSWORD,
    database : config.DB_DETAILS.DATABASE,
    debug    : config.DB_DETAILS.DEBUG
});

const query = (query, values, cb) => {
    pool.query(query, values, (err, results) => {
        if(err) {
            return cb(err, null);
        }
        return cb(null, results);
    })
}

module.exports = {
    query: query
}