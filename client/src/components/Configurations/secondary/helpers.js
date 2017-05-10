import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
export const IN_FT = Number(12);
export const CM_M = Number(10);

export function getSelectedSizeOptions(defaultProductSize) {
  if (!defaultProductSize || !defaultProductSize.length) {
    return [];
  }

  if (typeof (defaultProductSize)[0] === 'string') {
    return map(defaultProductSize, col => ({value: col, name: col}));
  }

  return map(defaultProductSize, col => ({value: col, name: col}));
}

export function getMainConfigValue(data) {
  const i = findIndex(data, c => c.isMain === true);
  if (i > -1) {
    return data[i];
  }

  return '';
}

export function getOptionsInputValue(propertyName, options) {
  if (!options || !options[propertyName]) {
    return '';
  }
  return options[propertyName];
}


