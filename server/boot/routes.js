'use strict';
const LIVE_ART = 'liveart';
const _ = require('lodash');
const url = require('url');

function getFullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}

function getFontFaceRule(family, file, weight, style, url) {
  const location = url + '/files/fonts/';
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
  };
}

function fixColorizables(colorizables) {
  return _.map(colorizables, col => ({
    id: col.id,
    name: col.name,
    colors: col._colors
  }));
}

function getGraphics(category, graphics, grImg, grThumb) {
  const grs = [];
  _.forEach(graphics, gr => {
    if (String(gr.categoryId) === String(category.id)) {
      grs.push({
        id: gr.id,
        categoryId: gr.categoryId,
        name: gr.name,
        description: gr.description,
        colors: gr.colors ? JSON.parse(gr.colors) : undefined,
        colorize: gr.colorize,
        multicolor: gr.multicolor,
        thumb: grThumb + gr.thumb,
        image: grImg + gr.image,
        colorizableElements: fixColorizables(gr.colorizables)
      });
    }
  });
  return grs.length ? grs : undefined;
}

function getCategories(category, categories, graphics, catThumb) {
  const cats = [];
  _.forEach(categories, cat => {
    if (String(cat.graphicsCategoryId) === String(category.id)) {
      cats.push({
        id: cat.id,
        name: cat.name,
        thumb: catThumb + cat.thumb,
        categories: getCategories(cat, categories, graphics),
        graphicsList: getGraphics(cat, graphics)
      });
    }
  });
  return cats.length ? cats : undefined;
}

module.exports = function (app) {
  const loopback = require('loopback');
  const css = require('css');
  app.get('/api/' + LIVE_ART + '/graphics', function (req, res) {
    const baseUrl = getFullUrl(req);
    console.log(baseUrl);
    const GR_IMG = baseUrl + '/files/graphicImages/';
    const GR_THUMB = baseUrl + '/files/graphicThumbs/';
    const CAT_THUMB = baseUrl + '/files/thumb/';
    const result = {};
    const Graphic = loopback.getModel('graphic');
    Graphic.find((err, graphics) => {
      if (err) {
        res.status(500).send('Error occurred');
      }

      const GraphicsCategories = loopback.getModel('graphicsCategory');
      GraphicsCategories.find((err, cats) => {
        if (err) {
          res.status(500).send('Error occurred');
        }

        if (cats && cats.length) {
          result.graphicsCategoriesList = [];
          _.forEach(cats, cat => {
            if (!cat.graphicsCategoryId || cat.graphicsCategoryId === '') {
              result.graphicsCategoriesList.push({
                id: cat.id,
                name: cat.name,
                thumb: CAT_THUMB + cat.thumb,
                categories: getCategories(cat, cats, graphics, CAT_THUMB),
                graphicsList: getGraphics(cat, graphics, GR_IMG, GR_THUMB)
              });
            }
          });

          res.send(JSON.stringify(result));
        }
      });
    });
  });

  app.get('/api/' + LIVE_ART + '/colors', function (req, res) {
    const Color = loopback.getModel('color');
    const colors = [];
    Color.find((err, cs) => {
      if (err) {
        res.status(500).send('Error occurred');
      }
      cs.map(col => colors.push({name: col.name, value: col.value}));
      res.send(JSON.stringify({colors: colors}));
    });
  });

  app.get('/api/' + LIVE_ART + '/fonts', function (req, res) {
    const baseUrl = getFullUrl(req);
    const VECTOR_ROOT = baseUrl + '/files/vectors/';
    const Font = loopback.getModel('Font');
    const fonts = [];
    Font.find({
      order: 'name ASC'
    }, (err, fnts) => {
      if (err) {
        res.status(500).send('Error occurred');
      }
      fnts.map(f => fonts.push({
        name: f.name, fontFamily: f.fontFamily, boldAllowed: f.boldAllowed,
        italicAllowed: f.italicAllowed, vector: f.vector ? VECTOR_ROOT + f.vector : undefined
      }));

      res.send(JSON.stringify({fonts: fonts}));
    });
  });

  app.get('/api/' + LIVE_ART + '/fontsCSS', function (req, res) {
    const baseUrl = getFullUrl(req);
      const Font = loopback.getModel('Font');
      const fonts = [];

      const NORMAL = 'normal';
      const BOLD = 'bold';
      const ITALIC = 'italic';

      Font.find({
        order: 'name ASC'
      }, (err, fnts) => {
        if (err) {
          res.status(500).send('Error occurred');
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
              getFontFaceRule(font.fontFamily, font.fileNormal, NORMAL, NORMAL, baseUrl)
            );
          }
          if (font.fileBold) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBold, BOLD, NORMAL, baseUrl)
            );
          }

          if (font.fileItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileItalic, NORMAL, ITALIC, baseUrl)
            );
          }

          if (font.fileBoldItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBoldItalic, BOLD, ITALIC, baseUrl)
            );
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
