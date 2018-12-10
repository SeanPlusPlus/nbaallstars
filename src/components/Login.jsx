import React, { useEffect } from 'react'
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
  return Auth.getUserTokens(oauth_token, oauth_verifier)
}

const Login = (props) => {
  useEffect(() => {
    const {
      location,
      history,
    } = props
    const queryParams = QueryString.parse(location.search)
    const {
      oauth_token,
      oauth_verifier,
    } = queryParams
    if (oauth_token && oauth_verifier) {
      getUserToken(oauth_token, oauth_verifier).then(() => {
        history.push('/')
      })
    }
  })

  return (
    <>
      <Nav />
      <Container id="main">
        <button type="button" onClick={() => Auth.logInWithTwitter()}>Log In With Twitter</button>
        <button type="button" onClick={() => Auth.logOut()}>Log Out</button>
      </Container>
    </>
  )
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
