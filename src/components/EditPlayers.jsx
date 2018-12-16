import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import {
  Container,
  Table,
  Button,
} from 'reactstrap'

// styles
import '../styles/EditPlayers.css'
import request from '../utils/request'
import playerUtil from '../utils/playerUtil'

// local components
import Nav from './Nav'

const EditPlayers = () => {
  const [user] = useGlobal('user')
  const [players, setPlayers] = useState([])
  function refreshPlayerData() {
    request.get('/api/players').then((data) => {
      setPlayers(data.players.map(s => playerUtil.getSanitizedPlayer(s)))
    })
  }
  useEffect(() => {
    refreshPlayerData()
  }, [])
  function removePlayer(playerID) {
    playerUtil.removePlayer(playerID).then(() => {
      refreshPlayerData()
    })
  }
  let adminMessage
  let userTable
  if (user) {
    if (user.isAdmin) {
      // Show Add Players console
      const playerTableRows = players.map(player => (
        <tr key={player.id}>
          <th scope="row">
            <img alt="profile" height="50" src={player.headshot} />
          </th>
          <td>{player.name}</td>
          <td>{player.team}</td>
          <td>{player.position}</td>
          <td>{player.id}</td>
          <td>
            <Button close onClick={() => removePlayer(player.id)} />
          </td>
        </tr>
      ))
      userTable = (
        <Table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {playerTableRows}
          </tbody>
        </Table>
      )
    } else {
      // User is not admin
      adminMessage = 'You are not an admin'
    }
  } else {
    // Not logged in
    adminMessage = 'You are not logged in'
  }
  return (
    <>
      <Nav />
      <Container id="main">
        {adminMessage}
        {userTable}
      </Container>
    </>
  )
}

export default EditPlayers
