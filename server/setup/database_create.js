const mysql = require('mysql');
const config = require('../config');

var con = mysql.createConnection({
    host: config.DB_DETAILS.HOST,
    user: config.DB_DETAILS.USER,
    password: config.DB_DETAILS.PASSWORD,
    multipleStatements: true // this allow you to run multiple queries at once.
});

con.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("Connected!, creating database now");
    con.query("CREATE DATABASE IF NOT EXISTS " + config.DB_DETAILS.DATABASE + " ;", (err, result) => {
        if (err) throw err;
        console.log("Database created");
        process.exit();
    })
});