import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagaWatchers from './sagas';
import configureStore from './store/configureStore.dev';
import AppContainer from './containers/AppContainer';
import OverviewContainer from './containers/OverviewContainer';
import FontsTableContainer from './containers/FontsTableContainer';
import ColorsTableContainer from './containers/colors/ColorsTableContainer';
import ColorgroupsTableContainer from './containers/colors/ColorgroupsTableContainer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(sagaWatchers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={AppContainer}>
        <IndexRoute component={OverviewContainer}/>
        <Route path='/fonts' component={FontsTableContainer}/>
        <Route path='/colors' component={ColorsTableContainer}/>
        <Route path='/colorgroups' component={ColorgroupsTableContainer}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
