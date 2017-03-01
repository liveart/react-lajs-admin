'use strict';

module.exports = function (Color) {

  Color.customized = function (msg, cb) {
    const loopback = require('loopback');
    const Color = loopback.getModel('color');
    const colors = [];
    Color.find((err, cs) => {
      cs.map(col => colors.push({name: col.name, value: col.value}));

      colors.push(...cs);
      cb(null, colors);
    });
  };

  Color.remoteMethod('customized', {
    accepts: {arg: 'msg', type: 'string'},
    returns: {arg: 'colors', type: 'array'},
    http: {path: '/customized', verb: 'get'}
  });

};
