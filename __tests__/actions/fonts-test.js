'use strict';

import * as F from '../../client/src/actions/fonts';

describe('Font Actions', () => {
  test('should create an action to fetch fonts', () => {
    const expectedAction = {
      type: F.FETCH_FONTS
    };
    expect(F.fetchFonts()).toEqual(expectedAction);
  });

  test('should create an action to fetch fonts number', () => {
    const expectedAction = {
      type: F.FETCH_FONTS_NUMBER
    };
    expect(F.fetchFontsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a font', () => {
    const font = {name: 'someName', description: 'description', other: 'false'};
    const expectedAction = {
      type: F.CREATE_FONT,
      font
    };
    expect(F.createFont(font)).toEqual(expectedAction);
  });

  test('should create an action to edit a font', () => {
    const id = 15;
    const font = {name: 'someName', description: 'description', other: 'false'};
    const expectedAction = {
      type: F.EDIT_FONT,
      id,
      newFont: font
    };
    expect(F.editFont(id, font)).toEqual(expectedAction);
  });

  test('should create an action to delete a font', () => {
    const id = 15;
    const expectedAction = {
      type: F.DELETE_FONT,
      id
    };
    expect(F.deleteFont(id)).toEqual(expectedAction);
  });
});
