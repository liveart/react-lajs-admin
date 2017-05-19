/**
 * Parses graphics and graphic categories from the LiveArt json structure.
 * @param json json as string
 * @param baseUrl url to use for links if needed
 * @returns {{categories: Array, graphics: Array}}
 */
export function parseJson(json, baseUrl) {
  if (baseUrl.length && baseUrl.charAt(baseUrl.length - 1) !== '/') {
    baseUrl += '/';
  }
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

  categories.forEach(cat => {
    if (cat.thumb) {
      cat.thumb = baseUrl + cat.thumb;
    }
  });

  graphics.forEach(gr => {
    if (gr.thumb) {
      gr.thumb = baseUrl + gr.thumb;
    }

    if (gr.image) {
      gr.image = baseUrl + gr.image;
    }
  });

  return {categories, graphics};
}

function parseGraphics(cat) {
  const graphics = [];
  const graphicsList = [];
  if (cat.graphicsList) {
    graphicsList.push(...cat.graphicsList);
  }
  if (graphicsList) {
    graphicsList.forEach(gr => {
      if (gr.colors) {
        if (typeof gr.colors !== 'object') {
          delete gr.colors;
        } else {
          let colors = [];
          gr.colors.forEach(col => {
            colors.push({name: col, value: col});
          });
          gr.colors = colors;
        }
      }
      if (gr.colorizableElements) {
        gr.colorizables = [];
        for (let i = 0; i < gr.colorizableElements.length; ++i) {
          if (!gr.colorizableElements[i].colors) {
            gr.colorizables[i] = {...gr.colorizableElements[i]};
            continue;
          }
          const cols = gr.colorizableElements[i].colors;
          delete gr.colorizableElements[i].colors;
          gr.colorizables[i] = {...gr.colorizableElements[i], _colors: cols};
        }
        delete gr.colorizableElements;
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
      if (cat.categories && cat.categories.length) {
        categoriesList.push(...cat.categories);
      }
      delete cat.categories;
      res.categories.push({...cat, graphicsCategoryId: category.id});
      categoriesList.forEach(cat2 => {
        const parsed = parseNested(cat2);
        delete cat2.categories;
        delete cat2.graphicsList;
        res.categories.push({...cat2, graphicsCategoryId: cat.id});
        res.categories.push(...parsed.categories);
        res.graphics.push(...parsed.graphics);
      });
    });
  }
  return res;
}
