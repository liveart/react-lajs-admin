import {ASSIGN_GROUP, ADD_COLOR} from '../../definitions';
import map from 'lodash/map';

export function updateNestedArray(arrName, ind, propName, event) {
  const arr = this.props.objectHolder[arrName];
  (arr[ind])[propName] = event.target.value;
  this.props.setEditingObjectProperty(arrName, [...arr]);
}

export function addToNestedArray(objectHolder, arrName, obj) {
  let arr = objectHolder[arrName];
  if (typeof arr !== 'object') {
    arr = [];
  }
  arr[arr.length] = {...obj};
  return {name: arrName, array: arr};
}

export function deleteFromNestedArray(objectHolder, arrName, key) {
  let arr = objectHolder[arrName];
  arr.splice(key, 1);
  return {name: arrName, array: arr};
}

export function deleteFromDblNestedArray(objectHolder, fArr, sArr, colorizableKey, key) {
  let arr = objectHolder[fArr];
  arr[colorizableKey][sArr].splice(key, 1);
  return {name: fArr, array: arr};
}

export function updateDblNestedArray(objectHolder, fArrName, sArrName, fInd, sInd, propName, event) {
  const arr = objectHolder[fArrName];
  arr[fInd][sArrName][sInd][propName] = event.target.value;
  return {name: fArrName, array: arr};
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

export function getColorsOptionsByColorizable(colorizables, key) {
  if (!colorizables[key]._colors ||
    !colorizables[key]._colors.length) {
    return [];
  }
  let arr = colorizables;
  if (arr[key]._colors) {
    return map(arr[key]._colors, col => ({value: col.value, name: col.name}));
  }
}

export function getSelectedColorizableOptions(colorizables, key) {
  let arr = colorizables;
  if (!arr[key].assignColorgroup) {
    return {value: arr[key].assignColorgroup, name: ADD_COLOR};
  } else {
    return {value: arr[key].assignColorgroup, name: ASSIGN_GROUP};
  }
}

export function getSelectedColorizableColorgroupOptions(colorizables, key) {
  if (!colorizables[key].colorgroup) {
    return {};
  }
  let arr = colorizables;
  if (arr[key].colorgroup) {
    return {id: arr[key].colorgroup.id, name: arr[key].colorgroup.name};
  }
}

export function getOptions(colors) {
  if (!colors || !colors.length) {
    return [];
  }
  return colors;
}

export function getSelectedOptions(colors) {
  if (!colors || !colors.length) {
    return [];
  }
  if (typeof (colors)[0] === 'string') {
    return map(colors, col => ({value: col, name: col}));
  }
  return colors;
}
