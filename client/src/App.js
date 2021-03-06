import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

// import logo from './logo.svg';
import './App.css'
import Navbar from './containers/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import PrivateRoute from './containers/PrivateRoute'

import Register from './containers/Register'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import { clearCurrentPaper } from './actions/paperActions'
import PaperEditor from './containers/PaperEditor'
import Errors from './components/errors/Errors'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentPaper())
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/errors" component={Errors} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/paper-editor"
                  component={PaperEditor}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/paper-editor/:paperId"
                  component={PaperEditor}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
