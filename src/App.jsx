import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './utils/auth'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// local components
import Refresh from './components/Refresh'
import Main from './components/Main'
import Login from './components/Login'
import Profile from './components/Profile'

const App = () => {
  const setUser = useGlobal('user')[1]
  useEffect(() => {
    Auth.getUserInfoFromCookie().then((twitterUserData) => {
      const userData = JSON.parse(twitterUserData)
      setUser(userData)
    }).catch(() => {})
  }, [])
  return (
    <Router>
    <>
      <Refresh />
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
    </>
    </Router>
  )
}

export default App
