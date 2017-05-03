'use strict';

import * as F from '../../client/src/actionTypes/graphics';
import * as FF from '../../client/src/actions/graphics';

describe('Graphic Actions', () => {
  test('should create an action to fetch graphics', () => {
    const expectedAction = {
      type: F.FETCH_GRAPHICS
    };
    expect(FF.fetchGraphics()).toEqual(expectedAction);
  });

  test('should create an action to fetch graphics number', () => {
    const expectedAction = {
      type: F.FETCH_GRAPHICS_NUMBER
    };
    expect(FF.fetchGraphicsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a graphic', () => {
    const graphic = {
      name: 'string',
      description: 'string',
      categoryId: 'string',
      colors: [],
      colorizables: [],
      colorize: false,
      multicolor: false,
      thumb: 'string',
      image: 'string'
    };
    const token = 'token';
    const expectedAction = {
      type: F.CREATE_GRAPHIC,
      graphic,
      token
    };
    expect(FF.createGraphic(graphic, token)).toEqual(expectedAction);
  });

  test('should create an action to edit a graphic', () => {
    const token = 'token';
    const id = 15;
    const graphic = {
      name: 'string',
      description: 'string',
      categoryId: 'string',
      colors: [],
      colorizables: [],
      colorize: false,
      multicolor: false,
      thumb: 'string',
      image: 'string'
    };
    const expectedAction = {
      type: F.EDIT_GRAPHIC,
      id,
      newGraphic: graphic,
      token
    };
    expect(FF.editGraphic(id, graphic, token)).toEqual(expectedAction);
  });

  test('should create an action to delete a graphic', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: F.DELETE_GRAPHIC,
      id,
      token
    };
    expect(FF.deleteGraphic(id, token)).toEqual(expectedAction);
  });
  test('should create an action to upload a image', () => {
    const imageFile = 'imageFile';
    const expectedAction = {
      type: F.UPLOAD_GRAPHIC_IMAGE,
      imageFile
    };
    expect(FF.uploadGraphicImage(imageFile)).toEqual(expectedAction);
  });
  test('should create an action to upload a thumb', () => {
    const thumbFile = 'thumbFile';
    const expectedAction = {
      type: F.UPLOAD_GRAPHIC_THUMB,
      thumbFile
    };
    expect(FF.uploadGraphicThumb(thumbFile)).toEqual(expectedAction);
  });
});
