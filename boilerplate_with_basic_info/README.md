# README

# react_redux_rails_boilerplate

## Set up backend

1. rails _5.2.3_ new boilerplate_with_basic_info -G --database=postgresql --skip-turbolinks
    **if you forget to add -g, do 'git rm --cached . -rf' 这里是_5.2.3_**
2. in gem file  and comment in gem 'bcrypt'
  group :development do
    gem 'better_errors'
    gem 'binding_of_caller'
    gem 'pry-rails'
    gem 'annotate'
    gem 'jquery-rails'
  end
3. bundle install
4. in app/assets/javascripts/application.js -- order matters - add  //= require jquery
  //= require jquery
  //= require rails-ujs
  //= require activestorage
  //= require_tree .
5. create .gitignore and include node_modules/  &  bundle.js  &  bundle.js.map
6. rails db:setup  
    **short for rails db:create db:schema:load db:seed**
7. rails g model user name:string.... 
8. do migration => rails db:migrate => do model (session has no model)
9. rails g controller api/users 
10. rails g controller static_pages 
  ** def root end ** 
 
 in views/static_pages/root.html.erb
  
<% if logged_in? %>
  <script type="text/javascript">
    window.currentUser = <%= render(
      "api/users/user.json.jbuilder",
      user: current_user
    ).html_safe %>
  </script>
<% end %>
 <div id="root">React is not working</div>
11. config/routes.fb
  namespace :api, defaults: {format: :json} do
    resources :teas, only: [:index, :create, :show]
  end
  root to: 'static_pages#root' 
13. views => api/user/index.json.jbuilder or _
14. rails c => check database
15. rails s => run server



## Set up frontend
1. npm init -y => package.json 
2. npm install webpack webpack-cli react react-dom react-router react-router-dom redux react-redux redux-logger @babel/core @babel/preset-env @babel/preset-react babel-loader
3. in package.json, make sure the webpack version is under 5, you can change the version to 4.29.3
4. "start": "webpack --watch --mode=development"  => npm start is ok
5. create a file - webpack.config.js 
```
const path = require('path');
module.exports = {
  context: __dirname,
  entry: './frontend/entry.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map'
};
```
7. create frontend folder in the root folder
   frontend
      + actions
        + session_actions.js
      + components
        + greeting
        + session_form
        + root.jsx
        + app.jsx
      + reducers
        + entities_reducer.js
        + errors_reducer.js
        + root_reducer.js
        + selectors.js
        + session_reducer.js
        + session_errors_reducer.js
      + store
        + store.js
      + util
        + route_util.js
        + session_api_util.js
      entry.jsx

8. in frontend folder, create entry.jsx, and actions/reducers/store/util/components
```
document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
```

9. npm run webpack => generate bundle.js
10. in congif/enviornment.file add 'Jbuilder.key_format camelize: :lower' 
11. in util folder, create an api_util.js + session_api_util.js + route_uril.jsx
```
export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/user',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);
```
```
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = state => (
  {loggedIn: Boolean(state.session.id)}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
```
12. in actions folder => session_actions.js
```
import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(logoutCurrentUser())
  ))
);
```

13. in reducer folder, create root_reducer.js entities_reducer.js session_reducer.js session_errors_reducers.js errors_reducer
```
import { combineReducers } from 'redux';

import entities from './entities_reducer';
import ui from './ui_reducer';
import session from './session_reducer';
import errors from './errors_reducer';

const rootReducer = combineReducers({
  entities,
  session,
  ui,
  errors,
});

export default rootReducer;
```
```
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.currentUser.id };
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};

export default sessionReducer;
```
```
import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};
```
```
import { combineReducers } from 'redux';

import session from './session_errors_reducer';

export default combineReducers({
  session
});
```
14. in store folder, create store.js 
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
```
15. in reducers folder, create selectors.js
16. in components folder, create root.jsx 
```
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root;
```


1.  rails g model user 
2.  rails g controller api/users 
3.  rails g controller api/sessions
4.  views/layouts/application.html.erb
5.  views/static_pages/root.html.erb




