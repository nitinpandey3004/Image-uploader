const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : config.DB_DETAILS.host,
    user     : config.DB_DETAILS.user,
    password : config.DB_DETAILS.password,
    database : config.DB_DETAILS.database,
    debug    : config.DB_DETAILS.debug
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