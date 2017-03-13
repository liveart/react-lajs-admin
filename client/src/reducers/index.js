import {combineReducers} from 'redux';
import fonts from './fonts';
import table from './table';
import user from './user';
import colors from './colors';
import colorgroups from './colorgroups';
import graphics from './graphics';
import colorizableElements from './colorizableElement';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  graphics,
  fonts,
  table,
  user,
  colors,
  colorgroups,
  colorizableElements,
  routing: routerReducer
});

export default rootReducer;
