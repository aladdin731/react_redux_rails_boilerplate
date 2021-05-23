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
8. in congif/enviornment.file add 'Jbuilder.key_format camelize: :lower' 

ready to production
1. Move the jquery-rails gem to the top-level of your Gemfile so that it is available in both development and production
2. Move logger 
3. db seed.rb
4. https://open.appacademy.io/learn/swe-in-person/full-stack-project/deploying-to-heroku
