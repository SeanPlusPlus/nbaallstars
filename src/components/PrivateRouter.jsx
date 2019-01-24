import React from 'react'
import { useGlobal } from 'reactn'
import { Route, Redirect } from 'react-router-dom'


// local component

const PrivateRouter = (props) => {
  const {
    component: Component,
    admin,
    ...rest
  } = props
  const [user] = useGlobal('user')
  let shouldRedirect = false
  if (user) {
    if (!user.isAdmin && admin) {
      shouldRedirect = true
    }
  } else {
    shouldRedirect = true
  }
  return (
    <Route
      {...rest}
      render={renderProps => (shouldRedirect ? (
        <Redirect to={{ pathname: '/', state: { from: renderProps.location } }} />
      ) : (
        <Component {...renderProps} />
      ))
      }
    />
  )
}

export default PrivateRouter
