import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import watchFetchFonts from './sagas';
import configureStore from './store/configureStore.dev';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Main from './containers/Main';

const App = ({children}) => (
  <div>
    <Header/>
    <NavBar/>
    <main className="content-wrapper">
      {children}
    </main>
  </div>
);

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(watchFetchFonts);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
