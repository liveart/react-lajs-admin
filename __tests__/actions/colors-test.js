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

  test('should create an action to fetch colors number', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COLORS_NUMBER
    };
    expect(C.fetchColorsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a color', () => {
    const color = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const expectedAction = {
      type: actionTypes.CREATE_COLOR,
      color
    };
    expect(C.createColor(color)).toEqual(expectedAction);
  });

  test('should create an action to edit a color', () => {
    const id = 15;
    const color = {name: 'someName', colorgroup_name: 'colorgroup_name', value: 'value'};
    const expectedAction = {
      type: actionTypes.EDIT_COLOR,
      id,
      newColor: color
    };
    expect(C.editColor(id, color)).toEqual(expectedAction);
  });

  test('should create an action to delete a color', () => {
    const id = 15;
    const expectedAction = {
      type: actionTypes.DELETE_COLOR,
      id
    };
    expect(C.deleteColor(id)).toEqual(expectedAction);
  });
});
