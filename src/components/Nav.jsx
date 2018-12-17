import React from 'react'
import { useGlobal } from 'reactn'
import { Link } from 'react-router-dom'
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
  const [user] = useGlobal('user')
  let userComponent
  if (user) {
    let adminConsole
    if (user.isAdmin) {
      adminConsole = (
        <>
          <DropdownItem divider />
          <DropdownItem header>Admin</DropdownItem>
          <DropdownItem>
            <Link to="/admin/users">
              View All Users
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/admin/edit-players">
              Edit Players
            </Link>
          </DropdownItem>
        </>
      )
    }
    userComponent = (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="user-card" nav>
            <img
              className="twitter-avatar rounded-circle"
              alt="User avatar"
              src={user.profile_image_url.replace('_normal', '')}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className="signed-in-as">
              <Link to="/profile">
                Signed in as
                {' '}
                <strong>{user.name}</strong>
              </Link>
            </DropdownItem>
            {adminConsole}
            <DropdownItem divider />
            <DropdownItem onClick={() => Auth.logOut()} className="link">
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
