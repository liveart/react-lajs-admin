import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import reducer from '../reducers';


export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  return store;
}
