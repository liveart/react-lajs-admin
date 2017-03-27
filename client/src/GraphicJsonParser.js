function parseGraphics(cat) {
  const graphics = [];
  const graphicsList = [];
  if (cat.graphicsList) {
    graphicsList.push(...cat.graphicsList);
  }
  if (graphicsList) {
    graphicsList.forEach(gr => {
      if (gr.colorizableElements) {
        for (let i = 0; i < gr.colorizableElements.length; ++i) {
          if (!gr.colorizableElements[i].colors) {
            continue;
          }
          gr.colorizableElements[i]._colors = [...gr.colorizableElements[i].colors];
          delete gr.colorizableElements[i].colors;
        }
      }
      graphics.push(gr);
    });
  }
  return graphics;
}

function parseNested(category) {
  const res = {categories: [], graphics: []};
  res.graphics.push(...parseGraphics(category));
  if (category.categories) {
    category.categories.forEach(cat => {
      const categoriesList = [];
      res.graphics.push(...parseGraphics(cat));
      delete cat.graphicsList;
      res.categories.push({...cat, graphicsCategoryId: category.id});
      if (cat.categories && cat.categories.length) {
        categoriesList.push(...cat.categories);
      }
      delete cat.categories;
      categoriesList.forEach(cat2 => {
        const parsed = parseNested(cat2);
        res.categories.push(parsed.categories);
        res.graphics.push(parsed.graphics);
      });
    });
  }
  console.log(res);
  return res;
}

export function parseJson(json) {
  const obj = JSON.parse(json);
  const graphics = [];
  const categories = [];
  const graphicsCategoriesList = obj.graphicsCategoriesList;
  graphicsCategoriesList.forEach(cat => {
    const res = parseNested(cat);
    delete cat.graphicsList;
    delete cat.categories;
    graphics.push(...res.graphics);
    categories.push(cat, ...res.categories);
  });

  return {categories, graphics};
}
