import React from 'react'
import { useGlobal } from 'reactn'

// local component

const AdminRedirect = () => {
  const [user] = useGlobal('user')
  let message
  if (user) {
    if (!user.isAdmin) {
      message = 'You are not an admin'
    }
  } else {
    message = 'You are not logged in'
  }
  return (
    <>
      <div>
        {message}
      </div>
    </>
  )
}

export default AdminRedirect
