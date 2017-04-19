import {combineReducers} from 'redux';
import fonts from './fonts';
import table from './table';
import user from './user';
import colors from './colors';
import colorgroups from './colorgroups';
import graphicsCategories from './graphicsCategories';
import graphics from './graphics';
import productsCategories from './productsCategories';
import products from './products';
import configurations from './configurations';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  graphics,
  fonts,
  table,
  user,
  colors,
  colorgroups,
  graphicsCategories,
  productsCategories,
  products,
  configurations,
  routing: routerReducer
});

export default rootReducer;
