import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// local components
import Refresh from './components/Refresh'
import Main from './components/Main'
import Login from './components/Login'
//import Twitter from './components/Twitter' <Route path="/sign-in-with-twitter" exact component={Twitter} />

const App = () => (
  <Router>
    <>
      <Refresh />
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      
    </>
  </Router>
)

export default App
