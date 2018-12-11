import React from 'react'
import { useGlobal } from 'reactn'
import {
  Container,
} from 'reactstrap'

// styles
import '../styles/Profile.css'

// local components
import Nav from './Nav'

const Profile = () => {
  const [user] = useGlobal('user')
  // const user = {}
  return (
    <>
      <Nav />
      <Container id="main">
        <h1 className="profile-title">Profile</h1>
        <hr />
        { user && (
          <code>{user.name}</code>
        )}
      </Container>
    </>
  )
}

export default Profile
