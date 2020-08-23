const config = require('../config');
const db = require('./../helpers/db');

db.query("CREATE DATABASE IF NOT EXISTS " + config.DB_DETAILS.DATABASE + " ;", null, (err, results) => {
    if (err) throw err;
    console.log("Main Database created");
    process.exit();
});