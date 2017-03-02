'use strict';

import * as actionTypes from '../../client/src/actionTypes/colors';
import * as C from '../../client/src/actions/colors';

describe('Color Actions', () => {
  test('should create an action to fetch colors', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COLORS
    };
    expect(C.fetchColors()).toEqual(expectedAction);
  });
  test('should create an action to fetch color by id', () => {
    const id = 15;
    const expectedAction = {
      type: actionTypes.FETCH_COLOR_BY_ID,
      id
    };
    expect(C.fetchColorById(id)).toEqual(expectedAction);
  });

  test('should create an action to fetch colors number', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COLORS_NUMBER
    };
    expect(C.fetchColorsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a color', () => {
    const color = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const token = 'token';
    const expectedAction = {
      type: actionTypes.CREATE_COLOR,
      color,
      token
    };
    expect(C.createColor(color, token)).toEqual(expectedAction);
  });

  test('should create an action to edit a color', () => {
    const id = 15;
    const token = 'token';
    const color = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const expectedAction = {
      type: actionTypes.EDIT_COLOR,
      id,
      newColor: color,
      token
    };
    expect(C.editColor(id, color, token)).toEqual(expectedAction);
  });

  test('should create an action to delete a color', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: actionTypes.DELETE_COLOR,
      id,
      token
    };
    expect(C.deleteColor(id,token)).toEqual(expectedAction);
  });
});
