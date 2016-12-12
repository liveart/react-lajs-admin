import {combineReducers} from 'redux';
import fonts from './fonts';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fonts,
  routing: routerReducer
});

export default rootReducer;
