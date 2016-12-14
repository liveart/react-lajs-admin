import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagaWatchers from './sagas';
import configureStore from './store/configureStore.dev';
import App from './containers/App';
import Overview from './containers/OverviewContainer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(sagaWatchers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Overview}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
