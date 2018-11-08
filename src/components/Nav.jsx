import React from 'react'
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap'

// styles
import '../styles/Nav.css'

// assets
import logo from '../assets/logo.svg'

const Navigation = () => (
  <div>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img className="App-logo" alt="logo" src={logo} />
      </NavbarBrand>
      <NavbarBrand href="/">allstars</NavbarBrand>
    </Navbar>
  </div>
)

export default Navigation
