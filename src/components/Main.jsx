import React, { useReducer, useEffect } from 'react'
import {
  Container, Row, Col, Progress, ListGroup, ListGroupItem,
} from 'reactstrap'

// styles
import '../styles/Main.css'

// local components
import Nav from './Nav'
import Lineup from './Lineup'

// reducer
import reducer from '../reducers/user'

// action types
import actionTypes from '../actionTypes/user'

const {
  USERS_DATA_FETCHING,
  USERS_DATA_FETCH_SUCCESS,
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
        dispatch({ type: USERS_DATA_FETCHING })
        const uri = '/api/users'
        fetch(uri)
          .then(response => response.json())
          .then((payload) => {
            dispatch({ type: USERS_DATA_FETCH_SUCCESS, payload })
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
          <legend>Headline Sports</legend>
          <Lineup />
          <hr />
          { data === null ? (
            <Progress animated color="success" value="25" />
          ) : (
            <>
              <legend>App Users</legend>
              <ListGroup>
                { data.users.map(u => (
                  <ListGroupItem key={u.id}>{u.username}</ListGroupItem>
                ))
                }
              </ListGroup>
            </>
          )}
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default Main
