'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');

const app = module.exports = loopback();

const helmet = require('helmet');
app.use(helmet());

app.use(loopback.static(path.join(__dirname, '../client/public/')));

if (!process.env.NODE_ENV) {
  console.log('NODE_ENV is not set.');
  console.log('Running production.');
} else if (process.env.NODE_ENV === 'development') {
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
  console.warn('Running development.');
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/'));
});
app.get('/fonts', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/'));
});
app.get('/colors', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/'));
});
app.get('/colorgroups', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/'));
});
app.get('/admins', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/'));
});

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
