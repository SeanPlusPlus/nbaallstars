import React from 'react'
import PropTypes from 'prop-types'
import * as QueryString from 'query-string'
import {
  Container,
} from 'reactstrap'

// styles
import '../styles/Login.css'

// local components
import Nav from './Nav'
import Auth from '../utils/auth'

function getUserToken(oauth_token, oauth_verifier) {
  Auth.getUserTokens(oauth_token, oauth_verifier)
}

function redirectToTwitter() {
  Auth.logInWithTwitter()
}

function logOut() {
  Auth.logOut()
}

class Login extends React.Component {
  componentDidMount() {
    const {
      location,
      history,
    } = this.props
    const queryParams = QueryString.parse(location.search)
    const {
      oauth_token,
      oauth_verifier,
    } = queryParams
    if (oauth_token && oauth_verifier) {
      getUserToken(oauth_token, oauth_verifier)
      history.push('/')
    }
    Auth.getUserInfoFromCookie()
  }

  render() {
    return (
      <>
        <Nav />
        <Container id="main">
          <button type="button" onClick={redirectToTwitter}>Log In With Twitter</button>
          <button type="button" onClick={logOut}>Log Out</button>
        </Container>
      </>
    )
  }
}

Login.propTypes = {
  // This props are included by default by React. Not sure why ESLint throws this error.
  // Worried that if I add them in defaultProps it could create errors.
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.shape({}),
}


export default Login
