import React, { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from 'reactstrap'

// styles
import '../styles/Nav.css'

// assets
import logo from '../assets/logo.svg'
import Auth from '../utils/auth'

const Navigation = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    Auth.getUserInfoFromCookie().then((twitterUserData) => {
      const userData = JSON.parse(twitterUserData)
      setUser(userData)
    }).catch(() => {})
  }, [])
  let userComponent
  if (user) {
    console.log(user)
    userComponent = (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="user-card" nav caret>
            <img className="twitter-avatar" alt="User avatar" src={user.profile_image_url.replace('_normal', '')} />
            Kane Stapler
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => Auth.logOut()}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  } else {
    userComponent = (
      <Nav className="ml-auto" navbar>
        <NavLink href="#" onClick={() => Auth.logInWithTwitter()}>
          Login
        </NavLink>
      </Nav>
    )
  }
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img className="App-logo" alt="logo" src={logo} />
        </NavbarBrand>
        <NavbarBrand href="/">allstars</NavbarBrand>
        {userComponent}
      </Navbar>
    </div>
  )
}

export default Navigation
