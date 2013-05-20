var http = require("http");
var chat = require("./request-handler.js");

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(chat.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);