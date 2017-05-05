'use strict';
const getFullUrl = require('../routesUtils/FullUrl');
const getProducts = require('../routesUtils/Products');
const getProductCategories = require('../routesUtils/ProductCategories');
const getGraphics = require('../routesUtils/Graphics');
const getCategories = require('../routesUtils/GraphicCategories');
const getFontFaceRule = require('../routesUtils/Fonts');
const forEach = require('lodash/forEach');
const assignIn = require('lodash/assignIn');

const LIVE_ART = 'liveart';

module.exports = function (app) {
  const loopback = require('loopback');
  const css = require('css');
  app.get('/api/' + LIVE_ART + '/graphics', function (req, res) {
    const result = {};
    const Graphic = loopback.getModel('graphic');
    const Color = loopback.getModel('color');
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
          Color.find().then(colorsArr => {
            result.graphicsCategoriesList = [];
            forEach(cats, cat => {
              if (!cat.graphicsCategoryId || cat.graphicsCategoryId === '') {
                result.graphicsCategoriesList.push({
                  id: cat.id,
                  name: cat.name,
                  thumb: getFullUrl(req, cat.thumb),
                  categories: getCategories(cat, cats, graphics, req, colorsArr),
                  graphicsList: getGraphics(cat, graphics, req, colorsArr)
                });
              }
            });

            res.json(result);
          }).catch(() => res.status(500).send('Error occurred'));
        }
      });
    });
  });

  app.get('/api/' + LIVE_ART + '/products', function (req, res) {
    const result = {};
    const Product = loopback.getModel('product');
    const ProductCategories = loopback.getModel('productsCategory');
    const Color = loopback.getModel('color');
    Product.find().then(products => {
      ProductCategories.find().then(cats => {
        if (cats && cats.length) {
          Color.find().then(colorsArr => {
            result.productCategoriesList = [];
            forEach(cats, cat => {
              if (!cat.productsCategoryId || cat.productsCategoryId === '') {
                result.productCategoriesList.push({
                  id: cat.id,
                  name: cat.name,
                  thumbUrl: getFullUrl(req, cat.thumbUrl),
                  categories: getProductCategories(cat, cats, products, req, colorsArr),
                  products: getProducts(cat, products, req, colorsArr)
                });
              }
            });
            res.json(result);
          }).catch(() => res.status(500).send('Error occurred'));
        }
      }).catch(() => res.status(500).send('Error occurred'));
    }).catch(() => res.status(500).send('Error occurred'));
  });

  app.get('/api/' + LIVE_ART + '/colors', function (req, res) {
    const Color = loopback.getModel('color');
    const colors = [];
    Color.find((err, cs) => {
      if (err) {
        res.status(500).send('Error occurred');
      }
      cs.map(col => colors.push({name: col.name, value: col.value}));

      res.json({colors: colors});
    });
  });

  app.get('/api/' + LIVE_ART + '/configuration', function (req, res) {
    const Configuration = loopback.getModel('Configuration');
    Configuration
      .find({where: {isMain: true}})
      .then(confs => {
        if (confs.length) {
          const conf = confs[0].__data;
          delete conf.name;
          delete conf.id;
          delete conf.isMain;
          res.json(assignIn({}, conf, {
            productsList: {url: conf.productsList},
            fonts: {url: conf.fonts},
            graphicsList: {url: conf.graphicsList},
            social: {url: conf.social}
          }));
        } else {
          res.json({msg: 'No configurations set for Api'});
        }
      })
      .catch(() => res.status(500).send('Error occurred'));
  });

  app.get('/api/' + LIVE_ART + '/fonts', function (req, res) {
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
        italicAllowed: f.italicAllowed, vector: f.vector ? getFullUrl(req, f.vector) : undefined
      }));

      res.json({fonts: fonts});
    });
  });

  app.get('/api/' + LIVE_ART + '/fontsCSS',
    function (req, res) {
      const Font = loopback.getModel('Font');
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
              getFontFaceRule(font.fontFamily, font.fileNormal, NORMAL, NORMAL, req)
            );
          }
          if (font.fileBold) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBold, BOLD, NORMAL, req)
            );
          }

          if (font.fileItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileItalic, NORMAL, ITALIC, req)
            );
          }

          if (font.fileBoldItalic) {
            cssJS.stylesheet.rules.push(
              getFontFaceRule(font.fontFamily, font.fileBoldItalic, BOLD, ITALIC, req)
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
