import * as actionTypes from '../actionTypes/table';

export const selectRow = selectedObject => {
  return {
    type: actionTypes.SELECT_ROW,
    objectHolder: selectedObject
  };
};

export const enableEditing = object => {
  return {
    type: actionTypes.ENABLE_EDITING,
    object
  };
};

export const enableCreating = object => {
  return {
    type: actionTypes.ENABLE_CREATING,
    object
  };
};

export const enableConfirmDelete = () => {
  return {
    type: actionTypes.ENABLE_CONFIRM_DELETE
  };
};

export const enableDefaultStatus = () => {
  return {
    type: actionTypes.ENABLE_DEFAULT_STATUS
  };
};

export const setObjectHolderProperty = (propertyName, value) => {
  return {
    type: actionTypes.SET_OBJECT_HOLDER_PROPERTY,
    propertyName,
    value
  };
};

export const setInitialState = object => {
  return {
    type: actionTypes.SET_INITIAL_STATE,
    object
  };
};
