'use strict';
const LIVE_ART = 'liveart';

function getFontFaceRule(family, file, weight, style) {
  const location = 'http://hive.liveartdesigner.com:3000/files/fonts/';
  return {
    type: 'font-face',
    declarations: [
      {
        type: 'declaration',
        property: 'font-family',
        value: '"' + family + '"',
      }, {
        type: 'declaration',
        property: 'src',
        value: 'url("' + location + file + '")',
      }, {
        type: 'declaration',
        property: 'font-weight',
        value: weight,
      }, {
        type: 'declaration',
        property: 'font-style',
        value: style,
      }
    ]
  }
}

module.exports = function (app) {

  const loopback = require('loopback');
  const css = require('css');

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
      const fonts = [];

      const NORMAL = 'normal';
      const BOLD = 'bold';
      const ITALIC = 'italic';

      Font.find((err, fnts) => {
        if (err) {
          throw err;
        }
        let cssJS = {
          type: 'stylesheet',
          stylesheet: {
            rules: []
          }
        };
        fnts.map(font => {
          if (font.fileNormal) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileNormal, NORMAL, NORMAL)
            )
          }
          if (font.fileBold) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBold, BOLD, NORMAL)
            )
          }

          if (font.fileItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileItalic, NORMAL, ITALIC)
            )
          }

          if (font.fileBoldItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBoldItalic, BOLD, ITALIC)
            )
          }
        });
        res.set('Content-Type', 'text/css');
        res.set('X-Content-Type-Options', 'nosniff');
        res.send(css.stringify(cssJS));
      });
    }
  )
  ;
}
;
