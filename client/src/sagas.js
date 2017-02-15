import {put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';

import {
  GET_USER_TOKEN,
  GET_TOKEN_RESULT
} from './actions/user';


function* getUserToken(action) {
  try {
    const req = yield fetch('/api/clients/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: action.email, password: action.password})
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: GET_TOKEN_RESULT, token: json.id});
  } catch (e) {
    yield put({type: GET_TOKEN_RESULT, message: e.message});
  }
}


function* watchGetUserToken() {
  yield takeLatest(GET_USER_TOKEN, getUserToken);
}

import * as colorsWatchers from './sagas/watchers/colors';
import * as colorgroupsWatchers from './sagas/watchers/colorgroups';

import * as fontsWatchers from './sagas/watchers/fonts';

export default function* root() {
  yield [
    fork(watchGetUserToken),
    fork(colorsWatchers.watchFetchColors),
    fork(colorsWatchers.watchFetchColorsNumber),
    fork(colorsWatchers.watchCreateColor),
    fork(colorsWatchers.watchDeleteColor),
    fork(colorsWatchers.watchEditColor),
    fork(colorgroupsWatchers.watchFetchColorgroups),
    fork(colorgroupsWatchers.watchFetchColorgroupsNumber),
    fork(colorgroupsWatchers.watchCreateColorgroup),
    fork(colorgroupsWatchers.watchDeleteColorgroup),
    fork(colorgroupsWatchers.watchEditColorgroup)
    fork(fontsWatchers.watchFetchFonts),
    fork(fontsWatchers.watchFetchFontsNumber),
    fork(fontsWatchers.watchCreateFont),
    fork(fontsWatchers.watchUploadFont),
    fork(fontsWatchers.watchEditFont),
    fork(fontsWatchers.watchDeleteFont)
  ];
}
