import * as actionType from '../actionTypes/productsCategories';

const INITIAL_STATE = {
  productsCategory: null,
  productsCategories: [],
  productsCategoriesNumber: 0,
  productsCategoriesError: null,
  productsCategoriesLoading: false,
  productsCategoriesMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let productsCategoriesError;
  switch (action.type) {
    case actionType.PRODUCTS_CATEGORY_SUCCESS:
      return {
        ...state,
        productsCategory: action.productsCategory || state.productsCategory,
        productsCategories: action.productsCategories || state.productsCategories,
        productsCategoriesNumber: action.productsCategoriesNumber || state.productsCategoriesNumber,
        productsCategoriesError: null,
        productsCategoriesLoading: false,
        productsCategoriesMessage: action.message || null,
      };
    case actionType.PRODUCTS_CATEGORY_FAILURE:
      productsCategoriesError = action.message;
      return {...state, productsCategoriesMessage: null, productsCategoriesError, productsCategoriesLoading: false};
    case actionType.FETCH_PRODUCTS_CATEGORIES_BY_ID:
      return {
        ...state,
        productsCategory: null,
        productsCategoriesError: null,
        productsCategoriesLoading: true,
        productsCategoriesMessage: null
      };
    case actionType.FETCH_PRODUCTS_CATEGORIES:
      return {
        ...state,
        productsCategoriesMessage: null,
        productsCategoriesError: null,
        productsCategoriesLoading: true
      };
    case actionType.FETCH_PRODUCTS_CATEGORIES_NUMBER:
      return {
        ...state,
        productsCategoriesMessage: null,
        productsCategoriesNumber: 0,
        productsCategoriesError: null,
        productsCategoriesLoading: true
      };
    case actionType.CREATE_PRODUCTS_CATEGORIES:
      return {
        ...state,
        productsCategoriesMessage: null,
        productsCategoriesError: null,
        productsCategoriesLoading: true
      };
    case actionType.EDIT_PRODUCTS_CATEGORY:
      return {
        ...state,
        productsCategoriesMessage: null,
        productsCategoriesError: null,
        productsCategoriesLoading: true
      };
    case actionType.DELETE_PRODUCTS_CATEGORY:
      return {
        ...state,
        productsCategoriesMessage: null,
        productsCategoriesError: null,
        productsCategoriesLoading: true
      };
    default:
      return state;
  }
}
