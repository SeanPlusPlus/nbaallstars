import React from 'react'
import {
  Container,
} from 'reactstrap'

// styles
import '../styles/Main.css'

// local components
import Nav from './Nav'
import Lineup from './Lineup'

const Main = () => (
  <>
    <Nav />
    <Container id="main">
      <Lineup />
    </Container>
  </>
)

export default Main
