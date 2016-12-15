import {combineReducers} from 'redux';
import fonts from './fonts';
import table from './table';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fonts,
  table,
  routing: routerReducer
});

export default rootReducer;
