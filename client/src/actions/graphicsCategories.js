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

export const createGraphicsCategory = graphicsCategory => {
  return {
    type: actionTypes.CREATE_GRAPHICS_CATEGORIES,
    graphicsCategory
  };
};

export const uploadThumbnail = thumbnail => {
  return {
    type: actionTypes.UPLOAD_THUMBNAIL,
    thumbnail
  };
};

export const editGraphicsCategory = (id, graphicsCategory) => {
  return {
    type: actionTypes.EDIT_GRAPHICS_CATEGORY,
    id,
    newGraphicsCategory: graphicsCategory
  };
};

export const deleteGraphicsCategory = id => {
  return {
    type: actionTypes.DELETE_GRAPHICS_CATEGORY,
    id
  };
};
