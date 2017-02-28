'use strict';

import * as F from '../../client/src/actionTypes/fonts';
import * as FF from '../../client/src/actions/fonts';

describe('Font Actions', () => {
  test('should create an action to fetch fonts', () => {
    const expectedAction = {
      type: F.FETCH_FONTS
    };
    expect(FF.fetchFonts()).toEqual(expectedAction);
  });
  test('should create an action to fetch font by id', () => {
    const id = '15';
    const expectedAction = {
      type: F.FETCH_FONT_BY_ID,
      id
    };
    expect(FF.fetchFontById(id)).toEqual(expectedAction);
  });

  test('should create an action to fetch fonts number', () => {
    const expectedAction = {
      type: F.FETCH_FONTS_NUMBER
    };
    expect(FF.fetchFontsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a font', () => {
    const font = {name: 'someName', description: 'description', other: 'false'};
    const expectedAction = {
      type: F.CREATE_FONT,
      font
    };
    expect(FF.createFont(font)).toEqual(expectedAction);
  });

  test('should create an action to edit a font', () => {
    const id = 15;
    const font = {name: 'someName', description: 'description', other: 'false'};
    const expectedAction = {
      type: F.EDIT_FONT,
      id,
      newFont: font
    };
    expect(FF.editFont(id, font)).toEqual(expectedAction);
  });

  test('should create an action to delete a font', () => {
    const id = 15;
    const expectedAction = {
      type: F.DELETE_FONT,
      id
    };
    expect(FF.deleteFont(id)).toEqual(expectedAction);
  });
  test('should create an action to upload a file', () => {
    const fontFile = "fontFile";
    const expectedAction = {
      type: F.UPLOAD_FONT_FILE,
      fontFile
    };
    expect(FF.uploadFontFile(fontFile)).toEqual(expectedAction);
  });
});