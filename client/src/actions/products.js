import * as actionTypes from '../actionTypes/products';

export const fetchProducts = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS
  };
};

export const fetchProductsNumber = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_NUMBER
  };
};

export const createProduct = (product, token) => {
  return {
    type: actionTypes.CREATE_PRODUCT,
    product,
    token
  };
};

export const editProduct = (id, product, token) => {
  return {
    type: actionTypes.EDIT_PRODUCT,
    id,
    newProduct: product,
    token
  };
};

export const deleteProduct = (id, token) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    id,
    token
  };
};

