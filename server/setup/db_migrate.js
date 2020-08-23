const path = require('path');
const spawn = require('child-process-promise').spawn;

const spawnOptions = {stdio: 'inherit'};
(async () => {
    // Our database URL
    const url = 'mysql://root:root@localhost:3306/co_image';
    try {
        // Migrate the DB
        await spawn(path.join(__dirname, '/../node_modules/.bin/sequelize'), ['db:migrate', `--url=${url}`], spawnOptions);
        console.log('*************************');
        console.log('Migration successful');
    } catch (err) {
        // Oh no!
        console.log('*************************');
        console.log('Migration failed. Error:', err.message);
        process.exit(1);
    }
    process.exit(0);
})();