import React from 'react'
import * as QueryString from 'query-string'
import {
  Container
} from 'reactstrap'

// styles
import '../styles/Login.css'

// local components
import Nav from './Nav'
import Auth from '../utils/auth'

export default class Login extends React.Component {
  componentDidMount() {
    const queryParams = QueryString.parse(this.props.location.search)
    const {
      oauth_token,
      oauth_verifier,
    } = queryParams
    if (oauth_token && oauth_verifier) {
      getUserToken(oauth_token, oauth_verifier)
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <>
        <Nav />
        <Container id="main">
            <button onClick={redirectToTwitter}>Log In With Twitter</button>
        </Container>
      </>
    )
  }
}

function getUserToken(oauth_token, oauth_verifier) {
  Auth.getUserTokens(oauth_token, oauth_verifier)
}

function redirectToTwitter() {
  Auth.logInWithTwitter()
}
