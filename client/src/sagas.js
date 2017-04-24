import {fork} from 'redux-saga/effects';

import * as colorsWatchers from './sagas/watchers/colors';
import * as colorgroupsWatchers from './sagas/watchers/colorgroups';
import * as fontsWatchers from './sagas/watchers/fonts';
import * as usersWatchers from './sagas/watchers/users';
import * as graphicsWatchers from './sagas/watchers/graphics';
import * as graphicsCategoriesWatchers from './sagas/watchers/graphicsCategories';
import * as productsCategoriesWatchers from './sagas/watchers/productsCategories';
import * as productsWatchers from './sagas/watchers/products';
import * as configWatchers from './sagas/watchers/configurations';

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
    fork(graphicsWatchers.watchUploadGraphicImage),
    fork(graphicsWatchers.watchUploadGraphicThumb),
    fork(usersWatchers.watchDeleteUser),
    fork(usersWatchers.watchValidateToken),
    fork(graphicsCategoriesWatchers.watchFetchGraphicsCategories),
    fork(graphicsCategoriesWatchers.watchFetchGraphicsCategoryById),
    fork(graphicsCategoriesWatchers.watchFetchGraphicsCategoriesNumber),
    fork(graphicsCategoriesWatchers.watchCreateGraphicsCategory),
    fork(graphicsCategoriesWatchers.watchUploadThumbnail),
    fork(graphicsCategoriesWatchers.watchDeleteThumbnail),
    fork(graphicsCategoriesWatchers.watchEditGraphicsCategory),
    fork(graphicsCategoriesWatchers.watchDeleteGraphicsCategory),
    fork(productsCategoriesWatchers.watchFetchProductsCategories),
    fork(productsCategoriesWatchers.watchFetchProductsCategoryById),
    fork(productsCategoriesWatchers.watchFetchProductsCategoriesNumber),
    fork(productsCategoriesWatchers.watchCreateProductsCategory),
    fork(productsCategoriesWatchers.watchUploadThumbnail),
    fork(productsCategoriesWatchers.watchDeleteThumbnail),
    fork(productsCategoriesWatchers.watchEditProductsCategory),
    fork(productsCategoriesWatchers.watchDeleteProductsCategory),
    fork(productsWatchers.watchFetchProducts),
    fork(productsWatchers.watchFetchProductsNumber),
    fork(productsWatchers.watchCreateProduct),
    fork(productsWatchers.watchDeleteProduct),
    fork(productsWatchers.watchEditProduct),
    fork(productsWatchers.watchUploadProductImage),
    fork(productsWatchers.watchUploadProductThumb),
    fork(productsWatchers.watchUploadProductLocationImage),
    fork(productsWatchers.watchUploadProductLocationMask),
    fork(productsWatchers.watchUploadProductLocationOverlay),
    fork(configWatchers.watchFetchConfigurations),
    fork(configWatchers.watchFetchConfigurationById),
    fork(configWatchers.watchCreateConfiguration),
    fork(configWatchers.watchEditConfiguration),
    fork(configWatchers.watchDeleteConfiguration)
  ];
}
