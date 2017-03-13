import * as actionTypes from '../actionTypes/colorizable';

export const fetchColorizables = graphicId => {
  return {
    type: actionTypes.FETCH_COLORIZABLES,
    graphicId
  };
};

export const createColorizable = (graphicId, colorizable, token) => {
  return {
    type: actionTypes.CREATE_COLORIZABLE,
    colorizable,
    graphicId,
    token
  };
};

export const editColorizable = (graphicId, id, colorizable, token) => {
  return {
    type: actionTypes.EDIT_COLORIZABLE,
    graphicId,
    id,
    newColorizable: colorizable,
    token
  };
};

export const deleteColorizable = (graphicId, id, token) => {
  return {
    type: actionTypes.DELETE_COLORIZABLE,
    graphicId,
    id,
    token
  };
};
