import * as actionTypes from '../actionTypes/colors';

export const fetchColors = () => {
  return {
    type: actionTypes.FETCH_COLORS
  };
};

export const fetchColorById = id => {
  return {
    type: actionTypes.FETCH_COLOR_BY_ID,
    id
  };
};

export const fetchColorsNumber = () => {
  return {
    type: actionTypes.FETCH_COLORS_NUMBER
  };
};

export const createColor = (color, token) => {
  return {
    type: actionTypes.CREATE_COLOR,
    color,
    token
  };
};

export const editColor = (id, color, token) => {
  return {
    type: actionTypes.EDIT_COLOR,
    id,
    newColor: color,
    token
  };
};

export const deleteColor = (id, token) => {
  return {
    type: actionTypes.DELETE_COLOR,
    id,
    token
  };
};
