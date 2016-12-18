import {combineReducers} from 'redux';
import fonts from './fonts';
import table from './table';
import user from './user';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fonts,
  table,
  user,
  routing: routerReducer
});

export default rootReducer;
