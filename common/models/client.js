'use strict';

module.exports = function (Client) {

  Client.observe('before delete', function (ctx, next) {
    Client.find((err, users) => {
      if (users && users.length === 1) {
        next(new Error('Cannot delete when there is only 1 user.'));
      } else {
        next();
      }
    });
  });

  Client.observe('before save', function (ctx, next) {
    if (!ctx.options.accessToken) {
      next(new Error('Log in required.'));
    } else {
      next();
    }
  });
};
