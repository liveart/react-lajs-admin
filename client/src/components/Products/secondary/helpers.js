import {
  ASSIGN_GROUP,
  ADD_COLOR
} from '../../../definitions';
import map from 'lodash/map';

export function getOptions(colors) {
  if (!colors || !colors.length) {
    return [];
  }
  return colors;
}

export function getColorgroupsOptions(colorgroups) {
  if (!colorgroups || !colorgroups.length) {
    return [];
  }
  return colorgroups;
}

export function getColorizableColorsOptions() {
  return [{value: false, name: ADD_COLOR}, {value: true, name: ASSIGN_GROUP}];
}

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

export function getSelectedColorizableColorsOptions(key, colorizables) {
  if (!colorizables[key]._colors || !colorizables[key]._colors.length) {
    return [];
  }
  let arr = colorizables;
  if (arr[key]._colors) {
    return map(arr[key]._colors, col => ({value: col.value, name: col.name}));
  }
}

export function getSelectedColorizableOptions(key, colorizables) {
  let arr = colorizables;
  if (!arr[key].assignColorgroup) {
    return {value: arr[key].assignColorgroup, name: ADD_COLOR};
  } else {
    return {value: arr[key].assignColorgroup, name: ASSIGN_GROUP};
  }
}

export function getSelectedColorizableColorgroupOptions(key, colorizables) {
  if (!colorizables[key].colorgroup) {
    return {};
  }
  let arr = colorizables;
  if (arr[key].colorgroup) {
    return {id: arr[key].colorgroup.id, name: arr[key].colorgroup.name};
  }
}

export function getSelectedColorLocationsOptions(key, k, colors) {
  if (!colors[key].location[k]) {
    return {};
  }
  return {name: colors[key].location[k].name};
}
