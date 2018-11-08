import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

// styles
import '../styles/Nav.css'

// assets
import logo from '../assets/logo.svg'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('ALLSTARS_TOKEN')
    localStorage.removeItem('ALLSTARS_USERNAME')
    // const route = '/login'
    // history.push(route)
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img className="App-logo" alt="logo" src={logo} />
        </NavbarBrand>
        <NavbarBrand href="/">allstars</NavbarBrand>
        { localStorage.ALLSTARS_USERNAME
          && (<>
            <NavbarToggler onClick={e => handleToggle(e)} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="active">
                  <NavLink href="/">Discover</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {localStorage.ALLSTARS_USERNAME}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={
                        e => handleLogout(e)
                      }
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </>
          )}
      </Navbar>
    </div>
  )
}

// Navigation.propTypes = {
//   history: PropTypes.object.isRequired,
// }


export default Navigation
