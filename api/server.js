const port = process.env.port || 3001;
const http = require('http');
const app = require('./app');

http.createServer(app).listen(port);