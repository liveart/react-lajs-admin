export const FETCH_COLORS = 'FETCH_COLORS';
export const FETCH_COLORS_NUMBER = 'FETCH_COLORS_NUMBER';
export const CREATE_COLOR = 'CREATE_COLOR';
export const EDIT_COLOR = 'EDIT_COLOR';
export const DELETE_COLOR = 'DELETE_COLOR';
export const COLOR_OPERATION_SUCCESS = 'COLOR_OPERATION_SUCCESS';
export const COLOR_OPERATION_FAILURE = 'COLOR_OPERATION_FAILURE';

export const fetchColors = () => {
  return {
    type: FETCH_COLORS
  };
};

export const fetchColorsNumber = () => {
  return {
    type: FETCH_COLORS_NUMBER
  };
};

export const createColor = color => {
  return {
    type: CREATE_COLOR,
    color
  };
};

export const editColor = (id, color) => {
  return {
    type: EDIT_COLOR,
    id,
    newColor: color
  };
};

export const deleteColor = id => {
  return {
    type: DELETE_COLOR,
    id
  };
};
