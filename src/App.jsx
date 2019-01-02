import React from 'react'
import { setGlobal } from 'reactn'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './utils/auth'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// local components
import Refresh from './components/Refresh'
import Main from './components/Main'
import Login from './components/Login'
import Profile from './components/Profile'
import Users from './components/Users'
import EditPlayers from './components/EditPlayers'
import EditCaptains from './components/EditCaptains'
import EditAllstars from './components/EditAllstars'

const App = () => {
  Auth.getUserInfoFromCookie().then((twitterUserData) => {
    setGlobal({ user: twitterUserData })
  }).catch(() => {})
  return (
    <Router>
    <>
      <Refresh />
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/admin/users" exact component={Users} />
      <Route path="/admin/edit-players" exact component={EditPlayers} />
      <Route path="/admin/edit-captains" exact component={EditCaptains} />
      <Route path="/admin/edit-allstars" exact component={EditAllstars} />
    </>
    </Router>
  )
}

export default App
