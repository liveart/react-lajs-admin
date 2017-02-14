import * as actionTypes from '../actionTypes/colors';

export const fetchColors = () => {
  return {
    type: actionTypes.FETCH_COLORS
  };
};

export const fetchColorsNumber = () => {
  return {
    type: actionTypes.FETCH_COLORS_NUMBER
  };
};

export const createColor = color => {
  return {
    type: actionTypes.CREATE_COLOR,
    color
  };
};

export const editColor = (id, color) => {
  return {
    type: actionTypes.EDIT_COLOR,
    id,
    newColor: color
  };
};

export const deleteColor = id => {
  return {
    type: actionTypes.DELETE_COLOR,
    id
  };
};
