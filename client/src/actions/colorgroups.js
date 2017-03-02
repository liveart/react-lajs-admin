import * as actionTypes from '../actionTypes/colorgroups';

export const fetchColorgroups = () => {
  return {
    type: actionTypes.FETCH_COLORGROUPS
  };
};

export const fetchColorgroupById = id => {
  return {
    type: actionTypes.FETCH_COLORGROUP_BY_ID,
    id
  };
};

export const fetchColorgroupsNumber = () => {
  return {
    type: actionTypes.FETCH_COLORGROUPS_NUMBER
  };
};

export const createColorgroup = (colorgroup, token) => {
  return {
    type: actionTypes.CREATE_COLORGROUP,
    colorgroup,
    token
  };
};

export const editColorgroup = (id, colorgroup, token) => {
  return {
    type: actionTypes.EDIT_COLORGROUP,
    id,
    newColorgroup: colorgroup,
    token
  };
};

export const deleteColorgroup = (id, token) => {
  return {
    type: actionTypes.DELETE_COLORGROUP,
    id,
    token
  };
};
