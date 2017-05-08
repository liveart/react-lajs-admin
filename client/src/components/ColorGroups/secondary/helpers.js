import intersectionBy from 'lodash/intersectionBy';
import sortedUniq from 'lodash/sortedUniq';

export function getLinkedToProduct(products, colorgroupId, colors) {
  let linked = [];
  products.forEach(p => {
    p.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
      if (c.colorgroup && c.colorgroup.id === colorgroupId) {
        linked.push(p.name);
      }
    });
    p.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
      let arr = intersectionBy(c._colors, colors.filter(col =>
      col.colorgroupId === colorgroupId), 'name');
      if (arr.length) {
        linked.push(p.name);
      }
    });
  });
  linked = sortedUniq(linked);
  return linked;
}

export function getLinkedToGraphic(graphics, colorgroupId, colors) {
  let linked = [];
  graphics.forEach(g => {
    g.colorizables.filter(c => c.assignColorgroup === true).forEach(c => {
      if (c.colorgroup && c.colorgroup.id === colorgroupId) {
        linked.push(g.name);
      }
    });
    g.colorizables.filter(c => c.assignColorgroup === false).forEach(c => {
      let arr = intersectionBy(c._colors, colors.filter(col =>
      col.colorgroupId === colorgroupId), 'name');
      if (arr.length) {
        linked.push(g.name);
      }
    });
    let arr = intersectionBy(g.colors, colors.filter(col =>
    col.colorgroupId === colorgroupId), 'name');
    if (arr.length) {
      linked.push(g.name);
    }
  });
  linked = sortedUniq(linked);
  return linked;
}
