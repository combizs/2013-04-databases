var url = require('url');
var querystring = require('querystring');

var rooms = {
  '/classes/room': [],
  '/classes/room1': [],
  '/1/classes/messages': [],
  '/classes/messages': []
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds
  "Content-Type": "application/json"
};

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  request.setEncoding('utf8');

  var parsedurl = url.parse(request.url);
  var pathname = parsedurl.pathname;
  var query = querystring.parse(parsedurl.search);

  var statusCode = 500, data;

  switch (request.method) {
    case 'GET':
      statusCode = (rooms[pathname]) ? 200 : 404;
      data = rooms[pathname] || [];
      data = data.slice(~~query['?skip']);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results:data}));
      break;
    case 'OPTIONS':
      headers['Allow'] = 'GET, OPTIONS, POST';
      response.writeHead(200, headers);
      response.end('');
      break;
    case 'POST':
      var postData = [];
      var answerMessage;

      request.on('data', function(chunk) {
        postData.push(chunk);
      });

      request.on('end', function() {
        try {
          rooms[pathname] = rooms[pathname] || [];
          var message = JSON.parse(postData.join(''));
          // rooms[pathname].push(message);
          //todo: make it save to mysql

          response.writeHead(201, headers);
          answerMessage = JSON.stringify('');
        } catch (error) {
          response.writeHead(400, headers);
          answerMessage = JSON.stringify('POST Error. Bad JSON?');
        }
        finally {
          response.end(answerMessage);
        }
      });
      break;
  }
};