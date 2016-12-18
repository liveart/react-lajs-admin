'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

const helmet = require('helmet');
app.use(helmet());

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('DATABASE.db');

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS client (" +
    "id	INTEGER PRIMARY KEY," +
    "email TEXT NOT NULL," +
    "password TEXT NOT NULL," +
    "realm TEXT," +
    "username TEXT," +
    "credentials TEXT," +
    "challenges TEXT," +
    "emailverified TEXT," +
    "verificationtoken TEXT," +
    "status TEXT," +
    "created TEXT," +
    "lastupdated TEXT);");
  db.run("CREATE TABLE IF NOT EXISTS font (" +
    "id	INTEGER PRIMARY KEY," +
    "name TEXT NOT NULL," +
    "fontFamily TEXT NOT NULL," +
    "vector TEXT NOT NULL," +
    "boldAllowed TEXT," +
    "italicAllowed TEXT);");
});

db.close();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
