'use strict';
const getFullUrl = require('../routesUtils/FullUrl');
const map = require('lodash/map');
const forEach = require('lodash/forEach');

function getColors(colors) {
  if (!colors || !colors.length) {
    return undefined;
  }

  if (typeof colors[0] === 'string') {
    return colors;
  }

  return map(colors, col => col.value);
}

module.exports = function getGraphics(category, graphics, req, colorsArr) {
  const grs = [];
  forEach(graphics, gr => {
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
        colorizableElements: gr.colorizables ? map(gr.colorizables,
          cr => {
            const r = {
              name: cr.name,
              id: cr.id
            };
            if (cr.assignColorgroup && cr.colorgroup) {
              const cg = cr.colorgroup;
              r.colors = [...colorsArr
                .filter(c => String(c.colorgroupId) === String(cg.id))
                .map(c => ({
                  name: c.name,
                  value: c.value
                }))];
            } else {
              r.colors = cr._colors;
            }
            return r;
          }
        ) : undefined,
      });
    }
  });
  return grs.length ? grs : undefined;
};
