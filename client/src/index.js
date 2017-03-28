import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagaWatchers from './sagas';
import AppContainer from './containers/AppContainer';
import OverviewContainer from './containers/OverviewContainer';
import FontsContainer from './containers/FontsTableContainer';
import ColorsContainer from './containers/colors/ColorsTableContainer';
import ColorgroupsContainer from './containers/colors/ColorgroupsTableContainer';
import GraphicsContainer from './containers/GraphicsContainer';
import AdminsContainer from './containers/AdminsContainer';
import GraphicsCategoriesTableContainer from './containers/GraphicsCategoriesTableContainer';
import ProductsCategoriesContainer from './containers/ProductsCategoriesContainer';

let env = 'prod';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  env = 'dev';
}

let configureStore;
if (env === 'dev') {
  configureStore = require('./store/configureStore.dev.js');
} else if (env === 'prod') {
  configureStore = require('./store/configureStore.prod.js');
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(sagaWatchers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={AppContainer}>
        <IndexRoute component={OverviewContainer}/>
        <Route path='/fonts' component={FontsContainer}/>
        <Route path='/colors' component={ColorsContainer}/>
        <Route path='/colorgroups' component={ColorgroupsContainer}/>
        <Route path='/graphics' component={GraphicsContainer}/>
        <Route path='/admins' component={AdminsContainer}/>
        <Route path='/graphicsCategories' component={GraphicsCategoriesTableContainer}/>
        <Route path='/productsCategories' component={ProductsCategoriesContainer}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
