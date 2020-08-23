const fs = require('fs');
const path = require('path');
const db = require("./../models");
const image_services = require('./../services/image_services');

const preProcess = async () => {
    await db.sequelize.sync();

    fs.readFile(path.join(__dirname, '/intial.json'), (err, data) => {
        if (err) throw err;
        data = JSON.parse(data)["data"];
        let promiseArr = data.map(async (row) => {
            await image_services.update_db(row);
        });

        Promise.all(promiseArr).then(() => {
            console.log("Initial data loaded in db");
        })
    });
};

preProcess();