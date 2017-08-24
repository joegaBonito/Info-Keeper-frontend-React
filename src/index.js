import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import Index from './components/index';
import RequireAuth from './components/auth/require_auth';
import {AUTH_USER} from './actions/auth_types';
import NotFoundPage from './components/not-found-page';

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Showinfo = asyncComponent(() =>
  import('./components/showinfo').then(module => module.default)
)
const ShowinfoLists = asyncComponent(() =>
  import('./components/showinfolists').then(module => module.default)
)
const Createinfo = asyncComponent(() =>
  import('./components/createinfo').then(module => module.default)
)
const Updateinfo = asyncComponent(() =>
  import('./components/updateinfo').then(module => module.default)
)
const Signin = asyncComponent(() =>
  import('./components/auth/signin').then(module => module.default)
)
const Signout = asyncComponent(() =>
  import('./components/auth/signout').then(module => module.default)
)
const Signup = asyncComponent(() =>
  import('./components/auth/signup').then(module => module.default)
)
const Header = asyncComponent(() =>
  import('./components/header').then(module => module.default)
)

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
