'use strict';
const LIVE_ART = 'liveart';
module.exports = function (app) {

  const loopback = require('loopback');

  app.get('/api/' + LIVE_ART + '/colors', function (req, res) {
    const Color = loopback.getModel('color');
    const colors = [];
    Color.find((err, cs) => {
      cs.map(col => colors.push({name: col.name, value: col.value}));
      res.send(JSON.stringify({colors: colors}));
    });
  });

  app.get('/api/' + LIVE_ART + '/fonts', function (req, res) {
    const VECTOR_ROOT = '/files/vectors/';
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

  app.get('/api/' + LIVE_ART + '/fontsCSS', function (req, res) {
    const Font = loopback.getModel('Font');
    const location = 'http://hive.liveartdesigner.com:3000/files/fonts/';
    const fonts = [];
    Font.find((err, fnts) => {
      if (err) {
        throw err;
      }
      let data = '';
      fnts.map(font => {
        if (font.fileNormal) {
          data += '@font-face {\n';
          data += "    font-family: '" + font.fontFamily + "';\n";
          data += '    src: url("' + location + font.fileNormal + '");\n';
          data += '    font-weight: normal;\n';
          data += '    font-style: normal;\n';
          data += '}\n';
        }
        if (font.fileBold) {
          data += '@font-face {\n';
          data += "    font-family: '" + font.fontFamily + "';\n";
          data += '    src: url("' + location + font.fileBold + '");\n';
          data += '    font-weight: bold;\n';
          data += '    font-style: normal;\n';
          data += '}\n';
        }
        if (font.fileItalic) {
          data += '@font-face {\n';
          data += "    font-family: '" + font.fontFamily + "';\n";
          data += '    src: url("' + location + font.fileItalic + '");\n';
          data += '    font-weight: normal;\n';
          data += '    font-style: italic;\n';
          data += '}\n';
        }
        if (font.fileBoldItalic) {
          data += '@font-face {\n';
          data += "    font-family: '" + font.fontFamily + "';\n";
          data += '    src: url("' + location + font.fileBoldItalic + '");\n';
          data += '    font-weight: bold;\n';
          data += '    font-style: italic;\n';
          data += '}\n';
        }

      });

      res.set('Content-Type', 'text/css');
      res.set('X-Content-Type-Options', 'nosniff');
      res.send(data);
    });
  });
};
