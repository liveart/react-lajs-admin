'use strict';

module.exports = function (app) {
  let User = app.models.user;

  /*
  app.get('/', function (req, res) {

    res.render('login', {
      email: req.email,
      password: req.password
    });
  });
  */
  app.get('/verified', function (req, res) {
    res.render('verified');
  });

  app.post('/login', function (req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function (err, token) {
      if (err) {
        res.render('response', {
          title: 'Login failed',
          content: err,
          redirectTo: '/',
          redirectToLinkText: 'Try again'
        });
        return;
      }

      res.render('home', {
        email: req.body.email,
        accessToken: token.id
      });
    });
  });

  app.get('/logout', function (req, res, next) {
    if (!req.accessToken) {
      return res.sendStatus(401);
    }
    User.logout(req.accessToken.id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};
