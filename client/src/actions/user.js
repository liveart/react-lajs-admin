export const GET_USER_TOKEN = 'GET_USER_TOKEN';
export const RESTORE_USER_TOKEN = 'RESTORE_USER_TOKEN';
export const REMOVE_USER_TOKEN = 'REMOVE_USER_TOKEN';
export const GET_TOKEN_RESULT = 'GET_TOKEN_RESULT';
export const FETCH_USERS = 'FETCH_USERS';
export const REGISTER_USER = 'REGISTER_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const USER_OPERATION_SUCCESS = 'USER_OPERATION_SUCCESS';
export const USER_OPERATION_FAILURE = 'USER_OPERATION_FAILURE';


export const getUserToken = (email, password) => {
  return {
    type: GET_USER_TOKEN,
    email,
    password
  };
};

export const restoreUserToken = token => {
  return {
    type: RESTORE_USER_TOKEN,
    token
  };
};

export const removeUserToken = () => {
  return {
    type: REMOVE_USER_TOKEN
  };
};

export const fetchUsers = token => {
  return {
    type: FETCH_USERS,
    token
  };
};

export const registerUser = (user, token) => {
  return {
    type: REGISTER_USER,
    user,
    token
  };
};

export const editUser = (id, user, token) => {
  return {
    type: EDIT_USER,
    id,
    newUser: user,
    token
  };
};

export const deleteUser = (id, token) => {
  return {
    type: DELETE_USER,
    id,
    token
  };
};
