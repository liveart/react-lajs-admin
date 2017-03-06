import {combineReducers} from 'redux';
import fonts from './fonts';
import table from './table';
import user from './user';
import colors from './colors';
import colorgroups from './colorgroups';
import graphicsCategories from './graphicsCategories';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fonts,
  table,
  user,
  colors,
  colorgroups,
  graphicsCategories,
  routing: routerReducer
});

export default rootReducer;
