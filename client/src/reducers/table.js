import {
  SELECT_ROW, ENABLE_EDITING, ENABLE_CREATING,
  ENABLE_DEFAULT_STATUS, SET_OBJECT_HOLDER_PROPERTY, SET_INITIAL_STATE, ENABLE_CONFIRM_DELETE, ENABLE_IMPORT_JSON_STATUS
} from '../actionTypes/table';
import {
  STATUS_EDITING,
  STATUS_CREATING,
  STATUS_DEFAULT,
  STATUS_CONFIRM_DELETE,
  STATUS_IMPORT_JSON
} from '../definitions';

const INITIAL_STATE = {
  objectHolder: {},
  status: STATUS_DEFAULT
};

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
    case SELECT_ROW: {
      return {
        ...state, objectHolder: Object.assign({}, action.objectHolder)
      };
    }
    case SET_OBJECT_HOLDER_PROPERTY: {
      let newObj = state.objectHolder;
      if (!action.propertyName && typeof action.propertyName === 'object') {
        newObj = action.value;
      } else {
        newObj[action.propertyName] = action.value;
      }
      return {
        ...state, objectHolder: Object.assign({}, newObj)
      };
    }
    case ENABLE_EDITING: {
      let holder = {};
      Object.getOwnPropertyNames(action.object).forEach(prop => holder[prop] = '');
      return {...INITIAL_STATE, status: STATUS_EDITING, objectHolder: {}};
    }
    case ENABLE_CREATING: {
      let holder = {};
      Object.getOwnPropertyNames(action.object).map(prop => {
        if (typeof action.object[prop].default !== 'undefined') {
          holder[prop] = action.object[prop].default;
        } else {
          if (typeof action.object[prop].type === 'object' || action.object[prop].type === 'object' ||
            action.object[prop].type === 'array') {
            if (action.object[prop].type === 'array' || Array.isArray(action.object[prop].type)) {
              holder[prop] = [];
            } else {
              holder[prop] = {};
            }
          } else {
            holder[prop] = '';
          }
        }
      });
      return {...INITIAL_STATE, status: STATUS_CREATING, objectHolder: Object.assign({}, holder)};
    }
    case ENABLE_DEFAULT_STATUS:
      return {...state, status: STATUS_DEFAULT, objectHolder: {}};
    case ENABLE_CONFIRM_DELETE:
      return {...state, status: STATUS_CONFIRM_DELETE};
    case ENABLE_IMPORT_JSON_STATUS:
      return {...state, status: STATUS_IMPORT_JSON};
    case SET_INITIAL_STATE: {
      let holder = {};
      Object.getOwnPropertyNames(action.object).forEach(prop => holder[prop] = '');
      return {...INITIAL_STATE, objectHolder: Object.assign({}, holder)};
    }
    default:
      return state;
  }
}
