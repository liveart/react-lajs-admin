'use strict';

import * as actionTypes from '../../client/src/actionTypes/colorgroups';
import * as C from '../../client/src/actions/colorgroups';

describe('Colorgroups Actions', () => {
  test('should create an action to fetch colorgroups', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COLORGROUPS
    };
    expect(C.fetchColorgroups()).toEqual(expectedAction);
  });

  test('should create an action to fetch colorgroup by id', () => {
    const id = 15;
    const expectedAction = {
      type: actionTypes.FETCH_COLORGROUP_BY_ID,
      id
    };
    expect(C.fetchColorgroupById(id)).toEqual(expectedAction);
  });

  test('should create an action to fetch colorgroups number', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COLORGROUPS_NUMBER
    };
    expect(C.fetchColorgroupsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a colorgroup', () => {
    const token = 'token';
    const colorgroup = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const expectedAction = {
      type: actionTypes.CREATE_COLORGROUP,
      colorgroup,
      token
    };
    expect(C.createColorgroup(colorgroup,token)).toEqual(expectedAction);
  });

  test('should create an action to edit a colorgroup', () => {
    const token = 'token';
    const id = 15;
    const colorgroup = {name: 'someName'};
    const expectedAction = {
      type: actionTypes.EDIT_COLORGROUP,
      id,
      newColorgroup: colorgroup,
      token
    };
    expect(C.editColorgroup(id, colorgroup,token)).toEqual(expectedAction);
  });

  test('should create an action to delete a colorgroup', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: actionTypes.DELETE_COLORGROUP,
      id,
      token
    };
    expect(C.deleteColorgroup(id, token)).toEqual(expectedAction);
  });
});
