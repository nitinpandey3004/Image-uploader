const express = require('express');

const image_route = require('./routes/image_route.js');
const config = require('./config');

const app = express();
app.use('/api/image', image_route);
app.listen(config.PORT, () => {
    console.log('App is running!');
})