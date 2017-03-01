'use strict';
const LIVE_ART = 'liveart';
module.exports = function (app) {
  app.get('/api/' + LIVE_ART + '/colors', function (req, res) {
    const loopback = require('loopback');
    const Color = loopback.getModel('color');
    const colors = [];
    Color.find((err, cs) => {
      cs.map(col => colors.push({name: col.name, value: col.value}));
      res.send(JSON.stringify({colors: colors}));
    });
  });

  app.get('/api/' + LIVE_ART + '/fonts', function (req, res) {
    const VECTOR_ROOT = '/files/vectors/';
    const loopback = require('loopback');
    const Font = loopback.getModel('Font');
    const fonts = [];
    Font.find((err, fnts) => {
      fnts.map(f => fonts.push({
        name: f.name, fontFamily: f.fontFamily, boldAllowed: f.boldAllowed,
        italicAllowed: f.italicAllowed, vector: f.vector ? VECTOR_ROOT + f.vector : undefined
      }));

      res.send(JSON.stringify({fonts: fonts}));
    });
  });
};
