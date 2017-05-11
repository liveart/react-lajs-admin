'use strict';
const getFullUrl = require('.//FullUrl');
const getGraphics = require('.//Graphics');
const forEach = require('lodash/forEach');

module.exports = function getCategories(category, categories, graphics, req, colorsArr) {
  const cats = [];
  forEach(categories, cat => {
    if (String(cat.graphicsCategoryId) === String(category.id)) {
      cats.push({
        id: cat.id,
        name: cat.name,
        thumb: getFullUrl(req, cat.thumb),
        categories: getCategories(cat, categories, graphics, req),
        graphicsList: getGraphics(cat, graphics, req, colorsArr)
      });
    }
  });
  return cats.length ? cats : undefined;
};
