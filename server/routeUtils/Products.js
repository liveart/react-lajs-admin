const getFullUrl = require('./FullUrl');
const forEach = require('lodash/forEach');
const map = require('lodash/map');

module.exports = function getProducts(category, products, req, colorsArr) {
  const prs = [];
  forEach(products, pr => {
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
        colorizableElements: pr.colorizables ? map(pr.colorizables,
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
        colors: pr.colors ? map(pr.colors, cr => ({
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
        locations: pr.locations ? map(pr.locations, loc => (
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
};
