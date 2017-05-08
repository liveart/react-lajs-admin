import * as actionTypes from '../actionTypes/products';

const INITIAL_STATE = {
  products: [], productsNumber: 0, productsError: null, productsLoading: false, productsMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let productsError;
  switch (action.type) {
    case actionTypes.PRODUCT_OPERATION_SUCCESS:
      return {
        ...state,
        products: action.products || state.products,
        productsNumber: action.productsNumber || state.productsNumber,
        productsMessage: action.message || null,
        productsError: null,
        productsLoading: false
      };
    case actionTypes.PRODUCT_OPERATION_FAILURE:
      productsError = action.message;
      return {...state, productsError, productsMessage: null, productsLoading: false};
    case actionTypes.FETCH_PRODUCTS:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.FETCH_PRODUCTS_NUMBER:
      return {...state, productsNumber: 0, productsMessage: null, productsError: null, productsLoading: true};
    case actionTypes.CREATE_PRODUCT:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.UPLOAD_PRODUCT_IMAGE:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.UPLOAD_PRODUCT_THUMB:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.UPLOAD_PRODUCT_LOCATION_IMAGE:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.UPLOAD_PRODUCT_LOCATION_MASK:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.UPLOAD_PRODUCT_LOCATION_OVERLAY:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.EDIT_PRODUCT:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    case actionTypes.DELETE_PRODUCT:
      return {...state, productsError: null, productsMessage: null, productsLoading: true};
    default:
      return state;
  }
}
