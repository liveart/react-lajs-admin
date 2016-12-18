export const GET_USER_TOKEN = 'GET_USER_TOKEN';
export const REMOVE_USER_TOKEN = 'REMOVE_USER_TOKEN';
export const GET_TOKEN_RESULT = 'GET_TOKEN_RESULT';

export const getUserToken = (email, password) => {
  return {
    type: GET_USER_TOKEN,
    email,
    password
  };
};

export const removeUserToken = () => {
  return {
    type: REMOVE_USER_TOKEN
  };
};
