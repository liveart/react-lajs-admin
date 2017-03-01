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

export const createColorgroup = colorgroup => {
  return {
    type: actionTypes.CREATE_COLORGROUP,
    colorgroup
  };
};

export const editColorgroup = (id, colorgroup) => {
  return {
    type: actionTypes.EDIT_COLORGROUP,
    id,
    newColorgroup: colorgroup
  };
};

export const deleteColorgroup = id => {
  return {
    type: actionTypes.DELETE_COLORGROUP,
    id
  };
};
