var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');

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

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
exports.handleRequest = function(request, response) {
  // console.log("Serving request type " + request.method + " for url " + request.url);
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
      headers.Allow = 'GET, OPTIONS, POST';
      response.writeHead(200, headers);
      response.end('');
      break;
    case 'POST':
      var postData = '';
      var answerMessage;

      request.on('data', function(chunk) {
        postData += chunk;
      });
      request.on('end', function() {
      // console.log(postData);

        // dbConnection.connect();
        var message = querystring.parse(postData);
        try {
          rooms[pathname] = rooms[pathname] || [];
          // var queryString = "INSERT INTO messages (username, message) values ('" + message.username + "', '" + message.message + "');";
          var queryString = "INSERT INTO messages SET ?";
          var queryArgs = [message];

          statusCode = 200;
          response.writeHead(statusCode, headers);
          dbConnection.query(queryString, queryArgs);
        }
        catch (error) {
          console.error(error);
          response.writeHead(400, headers);
        }
        // finally {
          // dbConnection.end();
        // }
        response.end();
      });
      break;
  }
};