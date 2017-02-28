'use strict';

import * as T from '../../client/src/actionTypes/table';
import * as TT from '../../client/src/actions/table';

describe('Table Actions', () => {
  test('should create an action to select row', () => {
    const objectHolder = {id: 1};
    const expectedAction = {
      type: T.SELECT_ROW,
      objectHolder
    };
    expect(TT.selectRow(selectedRowId)).toEqual(expectedAction);
  });

  test('should create an action to set object property', () => {
    const expectedAction = {
      type: T.SET_OBJECT_HOLDER_PROPERTY,
      propertyName: 'id',
      value: 1
    };
    expect(T.setObjectHolderProperty('id', 1)).toEqual(expectedAction);
  });

  test('should create an action to enable editing', () => {
    const expectedAction = {
      type: T.ENABLE_EDITING
    };
    expect(TT.enableEditing()).toEqual(expectedAction);
  });

  test('should create an action to enable creating', () => {
    const expectedAction = {
      type: T.ENABLE_CREATING
    };
    expect(TT.enableCreating()).toEqual(expectedAction);
  });

  test('should create an action to enable default status', () => {
    const expectedAction = {
      type: T.ENABLE_DEFAULT_STATUS
    };
    expect(TT.enableDefaultStatus()).toEqual(expectedAction);
  });
});
