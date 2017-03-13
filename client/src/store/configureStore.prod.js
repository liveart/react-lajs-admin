import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers';

module.exports = function configureStore(sagaMiddleware) {

  const middleware = [];

  middleware.push(sagaMiddleware);

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  return finalCreateStore(reducer);
};
