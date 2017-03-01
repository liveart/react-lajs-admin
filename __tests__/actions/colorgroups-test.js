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
    const colorgroup = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const expectedAction = {
      type: actionTypes.CREATE_COLORGROUP,
      colorgroup
    };
    expect(C.createColorgroup(colorgroup)).toEqual(expectedAction);
  });

  test('should create an action to edit a colorgroup', () => {
    const id = 15;
    const colorgroup = {name: 'someName'};
    const expectedAction = {
      type: actionTypes.EDIT_COLORGROUP,
      id,
      newColorgroup: colorgroup
    };
    expect(C.editColorgroup(id, colorgroup)).toEqual(expectedAction);
  });

  test('should create an action to delete a colorgroup', () => {
    const id = 15;
    const expectedAction = {
      type: actionTypes.DELETE_COLORGROUP,
      id
    };
    expect(C.deleteColorgroup(id)).toEqual(expectedAction);
  });
});
