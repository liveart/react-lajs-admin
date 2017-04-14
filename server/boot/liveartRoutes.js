'use strict';
const LIVE_ART = 'liveart';
const RELATIVE_URL = '@@RELATIVE';
const _ = require('lodash');
const url = require('url');

function getFullUrl(req, urlStr) {
  if (urlStr.substring(0, RELATIVE_URL.length) === RELATIVE_URL) {
    const addr = url.format({
      protocol: req.protocol,
      host: req.get('host')
    });
    return addr + urlStr.substring(RELATIVE_URL.length);
  }
  return urlStr;
}

function getFontFaceRule(family, file, weight, style, req) {
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
        value: 'url("' + getFullUrl(req, file) + '")',
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

function getColors(colors) {
  if (!colors || !colors.length) {
    return undefined;
  }

  if (typeof colors[0] === 'string') {
    return colors;
  }

  return _.map(colors, col => col.value);
}

function getCategories(category, categories, graphics, req) {
  const cats = [];
  _.forEach(categories, cat => {
    if (String(cat.graphicsCategoryId) === String(category.id)) {
      cats.push({
        id: cat.id,
        name: cat.name,
        thumb: getFullUrl(req, cat.thumb),
        categories: getCategories(cat, categories, graphics, req),
        graphicsList: getGraphics(cat, graphics, req)
      });
    }
  });
  return cats.length ? cats : undefined;
}

function getGraphics(category, graphics, req) {
  const grs = [];
  _.forEach(graphics, gr => {
    if (String(gr.categoryId) === String(category.id)) {
      grs.push({
        id: gr.id,
        categoryId: gr.categoryId,
        name: gr.name,
        description: gr.description,
        colors: getColors(gr.colors),
        colorize: gr.colorize,
        multicolor: gr.multicolor,
        thumb: getFullUrl(req, gr.thumb),
        image: getFullUrl(req, gr.image),
        colorizableElements: fixColorizables(gr.colorizables)
      });
    }
  });
  return grs.length ? grs : undefined;
}

function getProductCategories(category, categories, products, req, loopback) {
  const cats = [];
  _.forEach(categories, cat => {
    if (String(cat.graphicsCategoryId) === String(category.id)) {
      cats.push({
        id: cat.id,
        name: cat.name,
        thumbUrl: getFullUrl(req, cat.thumbUrl),
        categories: getProductCategories(cat, categories, products, req, loopback),
        products: getProducts(cat, products, req, loopback)
      });
    }
  });
  return cats.length ? cats : undefined;
}

function getProducts(category, products, req, loopback) {
  const prs = [];
  _.forEach(products, pr => {
    if (String(pr.categoryId) === String(category.id)) {
      prs.push({
        id: pr.id,
        name: pr.name,
        thumbUrl: getFullUrl(req, pr.thumbUrl),
        description: pr.description,
        data: pr.data,
        categoryId: pr.categoryId,
        minDPU: pr.minDPU,
        minQuantity: pr.minQuantity,
        multicolor: pr.multicolor,
        colorizableElements: pr.colorizables ? _.map(pr.colorizables,
          cr => {
            const r = {
              name: cr.name,
              id: cr.id
            };
            if (cr.assignColorgroup && cr.colorgroups) {
              const colorsArr = [];
              const Color = loopback.getModel('color');
              cr.colorgroups.forEach(cg => {
                Color.find({
                  where: {
                    colorgroupId: cg.id
                  }
                }, (err, cols) => {
                  if (!err) {
                    colorsArr.push(...cols);
                  }
                });
              });
              r.colors = colorsArr;
            } else {
              r.colors = cr._colors;
            }

          }
        ) : undefined,
        colors: pr.colors ? _.map(pr.colors, cr => ({
          name: cr.name,
          value: cr.value,
          location: cr.location
        })) : undefined,
        hideEditableAreaBorder: pr.hideEditableAreaBorder,
        namesNumbersEnabled: pr.namesNumbersEnabled,
        pantones: {
          useForDecoration: pr.pantones ? pr.pantones.useForDecoration : undefined,
          useForProduct: pr.pantones ? pr.pantones.useForProduct : undefined
        },
        resizable: pr.resizable,
        editableAreaSizes: pr.editableAreaSizes,
        showRuler: pr.showRuler,
        sizes: pr.sizes,
        locations: pr.locations ? _.map(pr.locations, loc => (
          {
            name: loc.name,
            image: loc.image ? getFullUrl(req, loc.image) : undefined,
            mask: pr.mask ? getFullUrl(req, loc.mask) : undefined,
            overlayInfo: pr.overlayInfo ? getFullUrl(req, loc.overlayInfo) : undefined,
            editableArea: loc.editableArea,
            editableAreaUnits: loc.editableAreaUnits,
            editableAreaUnitsRange: loc.editableAreaUnitsRange,
            editableAreaUnitsRestrictRotation: loc.editableAreaUnitsRestrictRotation,
            clipRect: loc.clipRect
          })) : undefined
      });
    }
  });
  return prs.length ? prs : undefined;
}

module.exports = function (app) {
  const loopback = require('loopback');
  const css = require('css');
  app.get('/api/' + LIVE_ART + '/graphics', function (req, res) {
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
                thumb: getFullUrl(req, cat.thumb),
                categories: getCategories(cat, cats, graphics, req),
                graphicsList: getGraphics(cat, graphics, req)
              });
            }
          });

          res.json(result);
        }
      });
    });
  });

  app.get('/api/' + LIVE_ART + '/products', function (req, res) {
    const result = {};
    const Product = loopback.getModel('product');
    Product.find((err, products) => {
      if (err) {
        res.status(500).send('Error occurred');
      }

      const ProductCategories = loopback.getModel('productsCategory');
      ProductCategories.find((err, cats) => {
        if (err) {
          res.status(500).send('Error occurred');
        }

        if (cats && cats.length) {
          result.productCategoriesList = [];
          _.forEach(cats, cat => {
            if (!cat.productsCategoryId || cat.productsCategoryId === '') {
              result.productCategoriesList.push({
                id: cat.id,
                name: cat.name,
                thumbUrl: getFullUrl(req, cat.thumbUrl),
                categories: getProductCategories(cat, cats, products, req, loopback),
                products: getProducts(cat, products, req, loopback)
              });
            }
          });
          res.json(result);
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

      res.json({colors: colors});
    });
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
