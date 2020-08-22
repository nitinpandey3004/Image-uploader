/**
 * This file is used to run angular and node server together
 */

const app = require('./server/app.js');
const http = require('http');
const normalizePort = require('normalize-port');

var port = normalizePort(process.env.PORT || '3000');
// app.listen(port);

var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    console.log('Listening on ' + port);
}