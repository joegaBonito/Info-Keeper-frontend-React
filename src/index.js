import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import Index from './components/index';
import Showinfo from './components/showinfo';
import ShowinfoLists from './components/showinfolists';
import Createinfo from './components/createinfo';
import Updateinfo from './components/updateinfo';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Admin from './components/admin';
import Header from './components/header';
import RequireAuth from './components/auth/require_auth';
import {AUTH_USER} from './actions/auth_types';
import NotFoundPage from './components/not-found-page';


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
  <BrowserRouter >
    <div>
    <Route component={Header}/>
      <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signout" component={Signout}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/admin" component={RequireAuth(Admin)}/>
          <Route exact path="/updateinfo/:id" component = {RequireAuth(Updateinfo)}/>
          <Route exact path="/createinfo" component = {RequireAuth(Createinfo)}/>
          <Route exact path="/showinfolists" component = {RequireAuth(ShowinfoLists)}/>
          <Route exact path="/showinfo/:id" component = {RequireAuth(Showinfo)}/>
          <Route component= {NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));

  registerServiceWorker();
