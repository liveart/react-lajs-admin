import * as actionTypes from '../actionTypes/configurations';

export const fetchConfigurations = () => {
  return {
    type: actionTypes.FETCH_CONFIGURATIONS
  };
};

export const fetchConfigurationById = id => {
  return {
    type: actionTypes.FETCH_CONFIGURATION_BY_ID,
    id
  };
};

export const createConfiguration = (configuration, token) => {
  return {
    type: actionTypes.CREATE_CONFIGURATION,
    configuration,
    token
  };
};

export const editConfiguration = (id, configuration, token) => {
  return {
    type: actionTypes.EDIT_CONFIGURATION,
    id,
    newConfiguration: configuration,
    token
  };
};

export const deleteConfiguration = (id, token) => {
  return {
    type: actionTypes.DELETE_CONFIGURATION,
    id,
    token
  };
};
