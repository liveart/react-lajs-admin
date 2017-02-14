export const FETCH_COLORGROUPS = 'FETCH_COLORGROUPS';
export const FETCH_COLORGROUPS_NUMBER = 'FETCH_COLORGROUPS_NUMBER';
export const CREATE_COLORGROUP = 'CREATE_COLORGROUP';
export const EDIT_COLORGROUP = 'EDIT_COLORGROUP';
export const DELETE_COLORGROUP = 'DELETE_COLORGROUP';
export const COLORGROUP_OPERATION_SUCCESS = 'COLORGROUP_OPERATION_SUCCESS';
export const COLORGROUP_OPERATION_FAILURE = 'COLORGROUP_OPERATION_FAILURE';

export const fetchColorgroups = () => {
  return {
    type: FETCH_COLORGROUPS
  };
};

export const fetchColorgroupsNumber = () => {
  return {
    type: FETCH_COLORGROUPS_NUMBER
  };
};

export const createColorgroup = colorgroup => {
  return {
    type: CREATE_COLORGROUP,
    colorgroup
  };
};

export const editColorgroup = (id, colorgroup) => {
  return {
    type: EDIT_COLORGROUP,
    id,
    newColorgroup: colorgroup
  };
};

export const deleteColorgroup = id => {
  return {
    type: DELETE_COLORGROUP,
    id
  };
};
