/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const body = {results: []};

var requestHandler = function(request, response) {
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    // 'access-control-request-method': 'OPTIONS',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  
  var statusCode = 200;
  var postCode = 201;
  var failCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';


  response.writeHead(statusCode, headers);



  if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end();

  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(statusCode, headers);
    
    response.end(JSON.stringify(body));
  } else if (request.method === 'POST' && (request.url === '/classes/messages' || request.url === '/classes/rooms')) {
    
    var postArray = [];
    request.on('error', (err) => {
      response.statusCode = failCode;
      response.end();
    }).on('data', (data) => {
      postArray.push(data);
    }).on('end', () => {
      var buffered = Buffer.concat(postArray).toString();
      body.results.push(JSON.parse(buffered));

      response.writeHead(postCode, headers);
      response.end(JSON.stringify(body));
      // BEGINNING OF NEW STUFF
    });
  } else {
    response.writeHead(failCode);
    response.end();
  } 

};

exports.requestHandler = requestHandler;

