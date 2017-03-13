import * as actionTypes from '../actionTypes/colorizableColorConnection';

export const fetchColorizableColorConnections = colorizableId => {
  return {
    type: actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS,
    colorizableId
  };
};

export const createColorizableColorConnection = (colorizableColorConnection, token) => {
  return {
    type: actionTypes.CREATE_COLORIZABLE_COLOR_CONNECTION,
    colorizableColorConnection,
    token
  };
};

export const editColorizableColorConnection = (id, colorizableColorConnection, token) => {
  return {
    type: actionTypes.EDIT_COLORIZABLE_COLOR_CONNECTION,
    id,
    newColorizableColorConnection: colorizableColorConnection,
    token
  };
};

export const deleteColorizableColorConnection = (id, token) => {
  return {
    type: actionTypes.DELETE_COLORIZABLE_COLOR_CONNECTION,
    id,
    token
  };
};
