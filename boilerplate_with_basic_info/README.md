# README

# react_redux_rails_boilerplate

## Set up backend

1. rails _5.2.3_ new boilerplate_with_basic_info -G --database=postgresql --skip-turbolinks
    **if you forget to add -g, do 'git rm --cached . -rf'**
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
  **  <div id="root">React is not working</div> ** in views/static_pages/root.html.erb
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
      + components
        + root.jsx
        + app.jsx
      + reducers
      + store
      + util
      entry.jsx
8. in frontend folder, create entry.jsx, and actions/reducers/store/util/components
```
import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from './store/store';
import {Route, HashRouter} from 'react-router-dom';
import Root from './components/root';


document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render(<Root store={store}/>, rootEl);
});
```

9. npm run webpack => generate bundle.js
10. in congif/enviornment.file add 'Jbuilder.key_format camelize: :lower' 
11. in util folder, create an api_util.js -> make ajax request / import actions
```
export const fetchAllPokemon = () => {
    return (
        $.ajax({
            method: 'GET',
            url: 'api/pokemon'
        })
    )
}
```
12. in actions folder => xx_actions.js 
```
import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

export const receiveAllPokemon = pokemon => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})

export const requestAllPokemon = () => (dispatch) => (
  APIUtil.fetchAllPokemon().then(pokemon => dispatch(receiveAllPokemon(pokemon))) 
)
```
13. in reducer folder, create root_reducer.js entities_reducer.js xx_reducer.js
```
root reducer 
import { combineReducers } from "redux";
import {entitiesReducer} from './entities_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer
});
export default rootReducer
```
```
import {combineReducers} from 'redux';
import pokemonReducer from './pokemon_reducer';

export const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
})
```
```
import { RECEIVE_ALL_POKEMON } from '../actions/pokemon_actions';


const pokemonReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_ALL_POKEMON:
            return {...nextState, ...action.pokemon};
        default:
            return state; 
    }
}


export default pokemonReducer;
```
14. in store folder, create store.js 
```
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';

import thunk from '../middleware/thunk';

export const configureStore = () => (
  createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
);
```
15. in reducers folder, create selectors.js
16. in components folder, create root.jsx 
```
import React from 'react';
import {Provider} from 'react-redux';
import PokemonIndexContainer from './../components/pokemon/pokemon_index_container';
import {HashRouter} from 'react-router-dom'

const Root = ({store}) => (
    <Provider store={store}>
      <HashRouter>
       <PokemonIndexContainer />
      <HashRouter />
    </Provider>
)

export default Root;
```
17. in components floder, create pokemon/pokemon_index_container.jsx
```
import {connect} from 'react-redux';
import {selectAllPokemon} from '../../reducers/selectors';
import {requestAllPokemon} from '../../actions/pokemon_actions.js';
import PokemonIndex from './pokemon_index';

const mapStateToProps = state => ({
   pokemon: selectAllPokemon(state),
})

const mapDispatchToProps = dispatch => ({
    requestAllPokemon: () => dispatch(requestAllPokemon())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonIndex);
```
18. in components floder, create pokemon/pokemon_index.jsx
```
import React from 'react';

class PokemonIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.requestAllPokemon();
    }

    render(){
        return(
            <div>
                <ul>
                    {this.props.pokemon.map(poke => <li key={poke.id}>{poke.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default PokemonIndex;
```

