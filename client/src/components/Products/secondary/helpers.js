import map from 'lodash/map';

export function getColorsLocationsOptions(locations) {
  if (!locations || !locations.length) {
    return [];
  }
  return map(locations, l => ({name: l.name, value: l.name}));
}

export function getSelectedOptions(key, colors) {
  if (!colors || !colors.length) {
    return [];
  }

  if (colors[key]) {
    return {name: colors[key].name, value: colors[key].value};
  }
}

export function getSelectedColorLocationsOptions(key, k, colors) {
  if (!colors[key].location[k]) {
    return {};
  }
  return {name: colors[key].location[k].name};
}
