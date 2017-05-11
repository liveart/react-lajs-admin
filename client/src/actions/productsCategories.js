import * as actionTypes from '../actionTypes/productsCategories';

export const fetchProductsCategories = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_CATEGORIES
  };
};

export const fetchProductsCategoryById = id => {
  return {
    type: actionTypes.FETCH_PRODUCTS_CATEGORIES_BY_ID,
    id
  };
};

export const fetchProductsCategoriesNumber = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_CATEGORIES_NUMBER
  };
};

export const createProductsCategory = (productsCategory, token) => {
  return {
    type: actionTypes.CREATE_PRODUCTS_CATEGORIES,
    productsCategory,
    token
  };
};

export const editProductsCategory = (id, productsCategory, token) => {
  return {
    type: actionTypes.EDIT_PRODUCTS_CATEGORY,
    id,
    newProductsCategory: productsCategory,
    token
  };
};

export const deleteProductsCategory = (id, token) => {
  return {
    type: actionTypes.DELETE_PRODUCTS_CATEGORY,
    id,
    token
  };
};
