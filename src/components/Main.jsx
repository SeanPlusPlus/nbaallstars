import React from 'react'
import { Container, Row, Col } from 'reactstrap'

// styles
import '../styles/Main.css'

// local components
import Nav from './Nav'

const Main = () => (
  <>
    <Nav />
    <Container id="main">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <h1>hello world</h1>
        </Col>
      </Row>
    </Container>
  </>
)

export default Main
