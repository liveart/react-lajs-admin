'use strict';
const AUTH_ROUTE = 'verify';
module.exports = function (app) {
  app.get('/api/' + AUTH_ROUTE, function (req, res) {
    const loopback = require('loopback');
    const Token = loopback.getModel('AccessToken');
    if (!req.headers.authorization) {
      res.send(JSON.stringify({token: false}));
    } else {
      Token.findOne({
        where: {
          id: req.headers.authorization
        }
      }, function (err, token) {
        if (token && token.userId) {
          res.send(JSON.stringify({token: true}));
        } else {
          res.send(JSON.stringify({token: false}));
        }
      });
    }
  });
};
