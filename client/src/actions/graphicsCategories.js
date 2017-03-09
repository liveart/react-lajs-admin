import * as actionTypes from '../actionTypes/graphicsCategories';

export const fetchGraphicsCategories = () => {
  return {
    type: actionTypes.FETCH_GRAPHICS_CATEGORIES
  };
};

export const fetchGraphicsCategoryById = id => {
  return {
    type: actionTypes.FETCH_GRAPHICS_CATEGORIES_BY_ID,
    id
  };
};

export const fetchGraphicsCategoriesNumber = () => {
  return {
    type: actionTypes.FETCH_GRAPHICS_CATEGORIES_NUMBER
  };
};

export const createGraphicsCategory = (graphicsCategory, token) => {
  return {
    type: actionTypes.CREATE_GRAPHICS_CATEGORIES,
    graphicsCategory,
    token
  };
};

export const uploadThumbnail = thumbnail => {
  return {
    type: actionTypes.UPLOAD_THUMBNAIL,
    thumbnail
  };
};

export const deleteThumbnail = name => {
  return {
    type: actionTypes.DELETE_THUMBNAIL,
    name
  };
};

export const editGraphicsCategory = (id, graphicsCategory, token) => {
  return {
    type: actionTypes.EDIT_GRAPHICS_CATEGORY,
    id,
    newGraphicsCategory: graphicsCategory,
    token
  };
};

export const deleteGraphicsCategory = (id, token) => {
  return {
    type: actionTypes.DELETE_GRAPHICS_CATEGORY,
    id,
    token
  };
};
