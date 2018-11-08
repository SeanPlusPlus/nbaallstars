import React from 'react'
import {
  Jumbotron, Container, Row, Col,
} from 'reactstrap'

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
          <Jumbotron>
            <h1 className="display-3">Fantasy NBA All-Stars</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  </>
)

export default Main
