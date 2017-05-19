import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagaWatchers from './sagas';
import AppContainer from './containers/AppContainer';
import OverviewContainer from './containers/OverviewContainer';
import FontsContainer from './containers/FontsContainer';
import ColorsContainer from './containers/ColorsContainer';
import ColorgroupsContainer from './containers/ColorgroupsContainer';
import GraphicsContainer from './containers/GraphicsContainer';
import AdminsContainer from './containers/AdminsContainer';
import ProductsCategoriesContainer from './containers/ProductsCategoriesContainer';
import ProductsContainer from './containers/ProductsContainer';
import GraphicsCategoriesTableContainer from './containers/GraphicsCategoriesContainer';
import ConfigurationsContainer from './containers/ConfigurationsContainer';

/**
 * Setting env for client depending on the server environment variable which is set through the console.
 */
let env = 'prod';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  env = 'dev';
}

/**
 * Store configuration is loaded depending on the environment, development or production.
 */
let configureStore;
if (env === 'dev') {
  configureStore = require('./store/configureStore.dev.js');
} else if (env === 'prod') {
  configureStore = require('./store/configureStore.prod.js');
}

/**
 * Saga middleware.
 */
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);

/**
 * Browser history.
 */
const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(sagaWatchers);

/**
 * Main react render method which defines store provider, router, and configure routes.
 */
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
        <Route path='/products' component={ProductsContainer}/>
        <Route path='/configurations' component={ConfigurationsContainer}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('widgets-container'));
