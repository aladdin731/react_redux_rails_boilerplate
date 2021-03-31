# react_redux_rails_boilerplate

## Set up backend
1. create the template
  rails _5.2.3_ new project_name -G --database=postgresql --skip-turbolinks
  **if you forget to add -g, do 'git rm --cached . -rf'**
2. in gem file 
  group :development do
    gem 'better_errors'
    gem 'binding_of_caller'
    gem 'pry-rails'
    gem 'annotate'
    gem 'jquery-rails'
  end
3. bundle install
4. in app/assets/javascripts/application.js -- order matters
  //= require jquery
  //= require rails-ujs
  //= require activestorage
  //= require_tree .
5. rails db:setup  
    **short for rails db:create db:schema:load db:seed**
6. rails g model user name:string.... 
7. do migration => rails db:migrate
8. do model (session has no model)
9. rails g controller api/users 
10. rails g controller static_pages
  **  <div id="root">React is not working</div> ** 
12. config/routes.fb
    # add /api to request path to route to teas
  namespace :api, defaults: {format: :json} do
    resources :teas, only: [:index, :create, :show]
  end
  # if the request is get '/' route to here
  root to: 'static_pages#root' 
13. views => api/user/index.json.jbuilder or _
14. rails c => check database
15. rails s => run server


## Set up frontend
1. 


