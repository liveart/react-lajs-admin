'use strict';

import * as types from '../../client/src/actions/table';
import reducer from '../../client/src/reducers/table';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../client/src/definitions';

const INITIAL_STATE = {
  selectedRowId: null,
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
    const selectedRowId = 42;
    expect(
      reducer(INITIAL_STATE, {type: types.SELECT_ROW, selectedRowId})
    ).toEqual({
      ...INITIAL_STATE,
      selectedRowId,
      status: STATUS_DEFAULT
    })
  });

  test('should handle unselect ' + types.SELECT_ROW, () => {
    const selectedRowId = 42;
    expect(
      reducer({
        selectedRowId: 42,
        selected2RowId: null,
        status: STATUS_DEFAULT
      }, {type: types.SELECT_ROW, selectedRowId})
    ).toEqual({
      ...INITIAL_STATE,
      selectedRowId: null,
      status: STATUS_DEFAULT
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
        selectedRowId: null,
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
