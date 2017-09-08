import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import {AUTH_USER} from './actions/auth_types';
import RequireAuth from './components/auth/require_auth';
import asyncComponent from './AsyncComponent';

const AsyncHeader = asyncComponent(() => import('./components/header').then(module=>module.default))
const AsynIndex = asyncComponent(() => import('./components/index').then(module=>module.default))
const AsyncShowinfo = asyncComponent(() => import('./components/showinfo').then(module => module.default))
const AsyncShowinfoLists = asyncComponent(() => import('./components/showinfolists').then(module => module.default))
const AsyncCreateinfo = asyncComponent(() => import('./components/createinfo').then(module => module.default))
const AsyncUpdateinfo = asyncComponent(() => import('./components/updateinfo').then(module => module.default))
const AsyncSignin = asyncComponent(() => import('./components/auth/signin').then(module => module.default))
const AsyncSignout = asyncComponent(() => import('./components/auth/signout').then(module => module.default))
const AsyncSignup = asyncComponent(() => import('./components/auth/signup').then(module => module.default))
const AsyncNotFoundPage = asyncComponent(() => import('./components/not-found-page').then(module => module.default))

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in.
if(token) {
  // we need to update application state.
  store.dispatch({type:AUTH_USER});
}
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <div>
    <Route component={AsyncHeader}/>
      <Switch>
          <Route exact path="/" component={AsynIndex}/>
          <Route exact path="/signin" component={AsyncSignin}/>
          <Route exact path="/signout" component={AsyncSignout}/>
          <Route exact path="/signup" component={AsyncSignup}/>
          <Route exact path="/updateinfo/:id" component = {RequireAuth(AsyncUpdateinfo)}/>
          <Route exact path="/createinfo" component = {RequireAuth(AsyncCreateinfo)}/>
          <Route exact path="/showinfolists" component = {RequireAuth(AsyncShowinfoLists)}/>
          <Route exact path="/showinfo/:id" component = {RequireAuth(AsyncShowinfo)}/>
          <Route component= {AsyncNotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));

  registerServiceWorker();
