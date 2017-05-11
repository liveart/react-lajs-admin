'use strict';
const getFullUrl = require('.//FullUrl');
const getProducts = require('.//Products');
const forEach = require('lodash/forEach');

module.exports = function getProductCategories(category, categories, products, req, colorsArr) {
  const cats = [];
  forEach(categories, cat => {
    if (String(cat.productsCategoryId) === String(category.id)) {
      cats.push({
        id: cat.id,
        name: cat.name,
        thumbUrl: getFullUrl(req, cat.thumbUrl),
        categories: getProductCategories(cat, categories, products, req, colorsArr),
        products: getProducts(cat, products, req, colorsArr)
      });
    }
  });
  return cats.length ? cats : undefined;
};
