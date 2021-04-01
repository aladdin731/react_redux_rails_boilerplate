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
   
6. reducers = session + session_errors + root + entities_reducer.js + errors
   1. session.js = _nullSession + sessionReducer
      1. import constant  
   2. add to root 

7. components
   1. session folder
      1. signup_container - need action/session createNewUser thunk action
      2. sessionForm
      3. login_container - need action/session login thunk action 
   2. greeting floder - change link(signup/login) or action(logout)
      1. greeting _ container
      2. greeting
   3. app.jsx
   4. root.jsx
