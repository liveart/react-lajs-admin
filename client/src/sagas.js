import {fork} from 'redux-saga/effects';

import * as colorsWatchers from './sagas/watchers/colors';
import * as colorgroupsWatchers from './sagas/watchers/colorgroups';
import * as fontsWatchers from './sagas/watchers/fonts';
import * as usersWatchers from './sagas/watchers/users';
import * as graphicsWatchers from './sagas/watchers/graphics';

export default function* root() {
  yield [
    fork(usersWatchers.watchGetUserToken),
    fork(colorsWatchers.watchFetchColors),
    fork(colorsWatchers.watchFetchColorById),
    fork(colorsWatchers.watchFetchColorsNumber),
    fork(colorsWatchers.watchCreateColor),
    fork(colorsWatchers.watchDeleteColor),
    fork(colorsWatchers.watchEditColor),
    fork(colorgroupsWatchers.watchFetchColorgroups),
    fork(colorgroupsWatchers.watchFetchColorgroupById),
    fork(colorgroupsWatchers.watchFetchColorgroupsNumber),
    fork(colorgroupsWatchers.watchCreateColorgroup),
    fork(colorgroupsWatchers.watchDeleteColorgroup),
    fork(colorgroupsWatchers.watchEditColorgroup),
    fork(fontsWatchers.watchFetchFonts),
    fork(fontsWatchers.watchFetchFontById),
    fork(fontsWatchers.watchFetchFontsNumber),
    fork(fontsWatchers.watchCreateFont),
    fork(fontsWatchers.watchUploadFontFile),
    fork(fontsWatchers.watchUploadVectors),
    fork(fontsWatchers.watchEditFont),
    fork(fontsWatchers.watchDeleteFont),
    fork(usersWatchers.watchFetchUsers),
    fork(usersWatchers.watchRegisterUser),
    fork(usersWatchers.watchEditUser),
    fork(usersWatchers.watchDeleteUser),
    fork(graphicsWatchers.watchFetchGraphics),
    fork(graphicsWatchers.watchFetchGraphicsNumber),
    fork(graphicsWatchers.watchCreateGraphic),
    fork(graphicsWatchers.watchDeleteGraphic),
    fork(graphicsWatchers.watchEditGraphic),
    fork(usersWatchers.watchDeleteUser),
    fork(usersWatchers.watchValidateToken)
  ];
}
