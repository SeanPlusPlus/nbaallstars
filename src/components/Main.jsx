import React, { useReducer, useEffect } from 'react'
import {
  Container, Row, Col, Progress,
} from 'reactstrap'

// styles
import '../styles/Main.css'

// local components
import Nav from './Nav'
import Lineup from './Lineup'

// reducer
import reducer from '../reducers/main'

// action types
import actionTypes from '../actionTypes/main'

const {
  MAIN_DATA_FETCHING,
  MAIN_DATA_FETCH_SUCCESS,
} = actionTypes

const Main = () => {
  const [{
    data,
  }, dispatch] = useReducer(reducer, {
    data: null,
  })

  useEffect(
    () => {
      if (data === null) {
        dispatch({ type: MAIN_DATA_FETCHING })
        const uri = '/api'
        fetch(uri)
          .then(response => response.json())
          .then((payload) => {
            dispatch({ type: MAIN_DATA_FETCH_SUCCESS, payload })
          })
      }
    },
    [data],
  )

  return (
  <>
    <Nav />
    <Container id="main">
      <Row>
        <Col sm={{ size: 12 }}>
          <Lineup />
          <hr />
          { data === null ? (
            <Progress animated color="success" value="25" />
          ) : (
            <code>
              ESPN API DEMO:
              {' '}
              {JSON.stringify(data, null, 2)}
            </code>
          )}
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default Main
