'use strict';

import * as T from '../../client/src/actions/table';

describe('Table Actions', () => {
  test('should create an action to select row', () => {
    const selectedRowObject = {id: 1};
    const expectedAction = {
      type: T.SELECT_ROW,
      selectedRowObject
    };
    expect(T.selectRow(selectedRowObject)).toEqual(expectedAction);
  });

  test('should create an action to set object property', () => {
    const expectedAction = {
      type: T.SET_EDITING_OBJECT_PROPERTY,
      propertyName: 'id',
      value: 1
    };
    expect(T.setEditingObjectProperty('id', 1)).toEqual(expectedAction);
  });

  test('should create an action to enable editing', () => {
    const expectedAction = {
      type: T.ENABLE_EDITING
    };
    expect(T.enableEditing()).toEqual(expectedAction);
  });

  test('should create an action to enable creating', () => {
    const expectedAction = {
      type: T.ENABLE_CREATING
    };
    expect(T.enableCreating()).toEqual(expectedAction);
  });

  test('should create an action to enable default status', () => {
    const expectedAction = {
      type: T.ENABLE_DEFAULT_STATUS
    };
    expect(T.enableDefaultStatus()).toEqual(expectedAction);
  });
});
