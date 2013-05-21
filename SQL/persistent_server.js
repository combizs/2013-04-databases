var mysql = require('mysql');
var chat = require("./basic-server.js");

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
//Todo; FIX THIS
var message;
var queryString = "INSERT INTO messages (username, message) values ('Valjean', 'In mercys name, three days is all I need.')";
var queryArgs = [message];

dbConnection.query(queryString, queryArgs,
function(err, results, fields) {
  if(err) throw err;
  console.log('err:', err);
  console.log('results:', results);
  console.log('fields:', fields);
});

dbConnection.end();
