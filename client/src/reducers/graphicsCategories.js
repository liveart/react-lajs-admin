import * as actionType from '../actionTypes/graphicsCategories';

const INITIAL_STATE = {
  graphicsCategory: null,
  graphicsCategories: [],
  graphicsCategoriesNumber: 0,
  graphicsCategoriesError: null,
  graphicsCategoriesLoading: false,
  graphicsCategoriesMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let graphicsCategoriesError;
  switch (action.type) {
    case actionType.GRAPHICS_CATEGORY_SUCCESS:
      return {
        ...state,
        graphicsCategory: action.graphicsCategory || state.graphicsCategory,
        graphicsCategoriesMessage: action.message || null,
        graphicsCategories: action.graphicsCategories || state.graphicsCategories,
        graphicsCategoriesNumber: action.graphicsCategoriesNumber || state.graphicsCategoriesNumber,
        graphicsCategoriesError: null,
        graphicsCategoriesLoading: false
      };
    case actionType.GRAPHICS_CATEGORY_FAILURE:
      graphicsCategoriesError = action.message;
      return {...state, graphicsCategoryMessage: null, graphicsCategoriesError, graphicsCategoriesLoading: false};
    case actionType.FETCH_GRAPHICS_CATEGORIES_BY_ID:
      return {
        ...state,
        graphicsCategoriesMessage: null,
        graphicsCategory: null,
        graphicsCategoriesError: null,
        graphicsCategoriesLoading: true
      };
    case actionType.FETCH_GRAPHICS_CATEGORIES:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.FETCH_GRAPHICS_CATEGORIES_NUMBER:
      return {
        ...state,
        graphicsCategoriesMessage: null,
        graphicsCategoriesNumber: 0,
        graphicsCategoriesError: null,
        graphicsCategoriesLoading: true
      };
    case actionType.CREATE_GRAPHICS_CATEGORIES:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.UPLOAD_THUMBNAIL:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.DELETE_THUMBNAIL:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.EDIT_GRAPHICS_CATEGORY:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.DELETE_GRAPHICS_CATEGORY:
      return {...state, graphicsCategoriesMessage: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    default:
      return state;
  }
}

