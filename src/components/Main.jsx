import React from 'react'
import { Container, Row, Col } from 'reactstrap'

// local components
import Nav from './Nav'

const Main = () => (
  <>
    <Nav />
    <Container>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h1>hello world</h1>
        </Col>
      </Row>
    </Container>
  </>
)

export default Main
