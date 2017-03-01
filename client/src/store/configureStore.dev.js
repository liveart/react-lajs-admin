import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducers';

export default function configureStore(sagaMiddleware) {

  const middleware = [];

  middleware.push(sagaMiddleware);
  middleware.push(createLogger()); // only for debug

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer);

  return store;
}
