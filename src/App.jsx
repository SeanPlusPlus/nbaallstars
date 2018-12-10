import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// local components
import Refresh from './components/Refresh'
import Main from './components/Main'
import Login from './components/Login'

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
