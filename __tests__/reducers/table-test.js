'use strict';

import * as types from '../../client/src/actions/table';
import reducer from '../../client/src/reducers/table';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../client/src/definitions';

const INITIAL_STATE = {
  selectedRowObject: null,
  selected2RowId: null,
  status: STATUS_DEFAULT
};

describe('table reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.SELECT_ROW, () => {
    const selectedRowObject = {id: 1};
    expect(
      reducer(INITIAL_STATE, {type: types.SELECT_ROW, selectedRowObject})
    ).toEqual({
      ...INITIAL_STATE,
      selectedRowObject,
      status: STATUS_DEFAULT
    })
  });

  test('should handle unselect ' + types.SELECT_ROW, () => {
    const selectedRowObject = {id: 1};
    expect(
      reducer({
        selectedRowObject: {id: 1},
        selected2RowId: null,
        status: STATUS_DEFAULT
      }, {type: types.SELECT_ROW, selectedRowObject})
    ).toEqual({
      ...INITIAL_STATE,
      status: STATUS_DEFAULT
    })
  });

  test('should handle ' + types.SET_EDITING_OBJECT_PROPERTY, () => {
    const selectedRowObject = {id: 1};
    expect(
      reducer({...INITIAL_STATE, selectedRowObject: {id: 2}},
        {type: types.SET_EDITING_OBJECT_PROPERTY, propertyName: 'id', value: 1})
    ).toEqual({
      ...INITIAL_STATE,
      selectedRowObject
    })
  });

  test('should handle ' + types.SELECT_2TABLE_ROW, () => {
    const selected2RowId = 42;
    expect(
      reducer(INITIAL_STATE, {type: types.SELECT_2TABLE_ROW, selected2RowId})
    ).toEqual({
      ...INITIAL_STATE,
      selected2RowId,
      status: STATUS_DEFAULT
    })
  });

  test('should handle unselect ' + types.SELECT_2TABLE_ROW, () => {
    const selected2RowId = 42;
    expect(
      reducer({
        ...INITIAL_STATE,
        selected2RowId: 42,
        status: STATUS_DEFAULT
      }, {type: types.SELECT_2TABLE_ROW, selected2RowId})
    ).toEqual({
      ...INITIAL_STATE,
      selected2RowId: null,
      status: STATUS_DEFAULT
    })
  });

  test('should handle ' + types.ENABLE_EDITING, () => {
    expect(
      reducer(INITIAL_STATE, {type: types.ENABLE_EDITING})
    ).toEqual({
      ...INITIAL_STATE,
      status: STATUS_EDITING
    })
  });

  test('should handle ' + types.ENABLE_CREATING, () => {
    expect(
      reducer(INITIAL_STATE, {type: types.ENABLE_CREATING})
    ).toEqual({
      ...INITIAL_STATE,
      status: STATUS_CREATING
    })
  });

  test('should handle ' + types.ENABLE_DEFAULT_STATUS, () => {
    expect(
      reducer(INITIAL_STATE, {type: types.ENABLE_DEFAULT_STATUS})
    ).toEqual({
      ...INITIAL_STATE,
      status: STATUS_DEFAULT
    })
  });
});
