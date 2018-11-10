import React from 'react'
import {
  Container
} from 'reactstrap'

// styles
import '../styles/Login.css'

// local components
import Nav from './Nav'
import Auth from '../utils/auth'

const Login = () => (
  <>
    <Nav />
    <Container id="main">
        <button onClick={redirectToTwitter}>Log In With Twitter</button>
    </Container>
  </>
)

function redirectToTwitter() {
  Auth.logInWithTwitter()
}

export default Login
