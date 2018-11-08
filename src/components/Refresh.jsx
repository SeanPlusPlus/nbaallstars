import React from 'react'
import { Alert, Button } from 'reactstrap'

// styles
import '../styles/Refresh.css'

const reload = (e) => {
  e.preventDefault()
  window.location.reload(true)
}

const Refresh = () => (
  <Alert color="warning" id="refresh">
    A new version of allstars is available, please
    {' '}
    <Button
      type="button"
      color="primary"
      onClick={reload}
    >
      Refresh
    </Button>
  </Alert>
)

export default Refresh
