/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages";

    dbConnection.query("DELETE FROM " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    request({
      method: "POST",
      uri: "http://127.0.0.1:8080/classes/room1",
      form: {username: "Valjean",
              message: "In mercys name, three days is all I need."}
      },
    function(error, response, body) {
      var queryString = "SELECT * FROM messages WHERE username = 'Valjean'";
      var queryArgs = [];

      dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        expect(results.length).toEqual(1);
        expect(results[0].username).toEqual("Valjean");
        expect(results[0].message).toEqual("In mercys name, three days is all I need.");
        done();
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    var queryString = "INSERT INTO messages SET ?";
    var queryArgs = [{username: "Javert", message: "Men like you can never change!"}];

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        request("http://127.0.0.1:8080/classes/room1",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].message).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});
