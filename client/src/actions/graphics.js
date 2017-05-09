import * as actionTypes from '../actionTypes/graphics';

export const fetchGraphics = () => {
  return {
    type: actionTypes.FETCH_GRAPHICS
  };
};

export const fetchGraphicsNumber = () => {
  return {
    type: actionTypes.FETCH_GRAPHICS_NUMBER
  };
};

export const createGraphic = (graphic, token) => {
  return {
    type: actionTypes.CREATE_GRAPHIC,
    graphic,
    token
  };
};

export const editGraphic = (id, graphic, token) => {
  return {
    type: actionTypes.EDIT_GRAPHIC,
    id,
    newGraphic: graphic,
    token
  };
};

export const deleteGraphic = (id, token) => {
  return {
    type: actionTypes.DELETE_GRAPHIC,
    id,
    token
  };
};
