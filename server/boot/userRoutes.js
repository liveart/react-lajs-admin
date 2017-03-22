'use strict';
const AUTH_ROUTE = 'verify';
module.exports = function (app) {
  const loopback = require('loopback');

  app.get('/api/' + AUTH_ROUTE, function (req, res) {
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
          const User = loopback.getModel('Client');
          User.findOne({
            where: {
              id: token.userId
            }
          }, function (err, user) {
            if (user && user.email) {
              res.send(JSON.stringify({token: true, email: user.email}));
            } else {
              res.send(JSON.stringify({token: false}));
            }
          });
        } else {
          res.send(JSON.stringify({token: false}));
        }
      });
    }
  });
};
