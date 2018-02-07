
var handle = require('./request-handler');
var http = require('http');
var port = 3000;
var ip = '127.0.0.1';
var server = http.createServer(handle.requestHandler);
console.log('Listening on http://' + ip + ':' + port + '/classes/messages');
server.listen(port, ip);
