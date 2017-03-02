import * as actionType from '../actionTypes/graphicsCategories';

const INITIAL_STATE = {
  graphicsCategory: null,
  graphicsCategories: [],
  graphicsCategoriesNumber: 0,
  graphicsCategoriesError: null,
  graphicsCategoriesLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let graphicsCategoriesError;
  switch (action.type) {
    case actionType.GRAPHICS_CATEGORY_SUCCESS:
      return {
        ...state,
        graphicsCategory: action.graphicsCategory || state.graphicsCategory,
        graphicsCategories: action.graphicsCategories || state.graphicsCategories,
        graphicsCategoriesNumber: action.graphicsCategoriesNumber || state.graphicsCategoriesNumber,
        graphicsCategoriesError: null,
        graphicsCategoriesLoading: false
      };
    case actionType.GRAPHICS_CATEGORY_FAILURE:
      graphicsCategoriesError = action.message;
      return {...state, graphicsCategoriesError, graphicsCategoriesLoading: false};
    case actionType.FETCH_GRAPHICS_CATEGORIES_BY_ID:
      return {...state, graphicsCategory: null, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.FETCH_GRAPHICS_CATEGORIES:
      return {...state, graphicsCategories: [], graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.FETCH_GRAPHICS_CATEGORIES_NUMBER:
      return {...state, graphicsCategoriesNumber: 0, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.CREATE_GRAPHICS_CATEGORIES:
      return {...state, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.UPLOAD_THUMBNAIL:
      return {...state, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.EDIT_GRAPHICS_CATEGORY:
      return {...state, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    case actionType.DELETE_GRAPHICS_CATEGORY:
      return {...state, graphicsCategoriesError: null, graphicsCategoriesLoading: true};
    default:
      return state;
  }
}

