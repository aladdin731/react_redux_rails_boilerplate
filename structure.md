1. entry file -> root
   1. addEventListener
   2. preloadedState/window.currentUser from app/views/layouts/application.html.erb
   3. store from store/store 
   4. render root from static_pages
   
2. root - provider / hashrouter
   1. store as arg
   
3. root -> app 
   1. util/routes to change the route type in App
   2. import connect/Redirect/Route/withRouter
   3. mapStateToProps
   4. Auth and Protected
   
   
4. util/session
   1. signup - postUser
   2. login - postSession
   3. logout - deleteSession
   
5. actions/session.js 
   1. import from util 
   2. export constants
   3. 2 regular + 3 thunk
   4. receiveCurrentUser -- signup/login
   5. logoutCurrentUser -- logout 
   
6. reducers = session + root
   1. session.js = _nullSession + sessionReducer
      1. import constant  
   2. add to root 

7. components
   1. session
      1. signup_container - need action/session createNewUser thunk action
      2. signup.jsx - signup form 
      3. login_container - need action/session login thunk action 
      4. login.jsx - login form 
   2. navbar - change link(signup/login) or action(logout)
      1. navbar_container
      2. welcomebar_container
      3. 
   3. app.jsx
   4. root.jsx
