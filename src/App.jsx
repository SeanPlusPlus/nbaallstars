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
import PrivateRouter from './components/PrivateRouter'

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
      <PrivateRouter path="/profile" exact component={Profile} />
      <PrivateRouter path="/admin/users" admin exact component={Users} />
      <PrivateRouter path="/admin/edit-players" admin exact component={EditPlayers} />
      <PrivateRouter path="/admin/edit-captains" admin exact component={EditCaptains} />
      <PrivateRouter path="/admin/edit-allstars" admin exact component={EditAllstars} />
    </>
    </Router>
  )
}

export default App
