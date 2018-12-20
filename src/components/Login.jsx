import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import PropTypes from 'prop-types'
import * as QueryString from 'query-string'
import {
  Container, Button,
  Label, Input,
  Alert, Progress,
} from 'reactstrap'

// styles
import '../styles/Login.css'

// local components
import Auth from '../utils/auth'

function getUserToken(oauth_token, oauth_verifier) {
  return Auth.getUserTokens(oauth_token, oauth_verifier)
}

const Login = (props) => {
  const [passcode, setPasscode] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [user] = useGlobal('user')
  const {
    location,
    history,
  } = props
  useEffect(() => {
    const queryParams = QueryString.parse(location.search)
    const {
      oauth_token,
      oauth_verifier,
    } = queryParams
    if (oauth_token && oauth_verifier) {
      getUserToken(oauth_token, oauth_verifier).then(() => {
        history.push('/login')
      })
    }
  })

  function dismissAlerts() {
    setSuccess(false)
    setError(false)
  }

  function onSubmit() {
    dismissAlerts()
    Auth.addUser(passcode).then((data) => {
      if (data.message === 'Success') {
        setSuccess(true)
        setTimeout(() => { history.push('/') }, 1000)
      } else {
        setError(true)
      }
    })
  }
  let loginComponent
  if (!user) {
    loginComponent = (
      <Progress className="login-progress" animated color="warning" value="50" />
    )
  } else if (!user.isInvited) {
    loginComponent = (
      <div>
        <Label for="passcode-input">Passcode</Label>
        <Input
          type="password"
          name="passcode"
          id="passcode-input"
          value={passcode}
          placeholder="Enter Passcode"
          onChange={e => setPasscode(e.target.value)}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    )
  } else {
    window.location.href = '/'
  }

  return (
    <>
      <Container id="main">
        {loginComponent}
        <Alert className="alert-position" color="success" isOpen={success} toggle={dismissAlerts}>
          Success! You have been granted access to play NBA All Stars Fantasy
        </Alert>
        <Alert className="alert-position" color="danger" isOpen={error} toggle={dismissAlerts}>
          Incorrect Passcode
        </Alert>
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
