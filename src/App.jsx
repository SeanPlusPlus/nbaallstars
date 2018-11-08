import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// local components
import Main from './components/Main'

const App = () => (
  <Router>
    <>
      <Route path="/" exact component={Main} />
    </>
  </Router>
)


export default App
