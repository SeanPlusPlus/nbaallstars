import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import {
  Container, Table,
  Button, Label,
  Input,
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
  const [playerIDInput, setPlayerIDInput] = useState([])
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
  function addPlayer() {
    playerUtil.addPlayer(playerIDInput).then(() => {
      refreshPlayerData()
    })
  }
  let adminMessage
  let userTable
  let addUsers
  if (user) {
    if (user.isAdmin) {
      // Show Add Players console
      const playerTableRows = players.map(player => (
        <tr key={player.id}>
          <th scope="row">
            <img alt="profile" height="50" src={player.headshot} />
          </th>
          <td>{player.name}</td>
          <td>
            <img alt="team" className="team-logo" height="50" src={player.teamLogo} />
            {player.team}
          </td>
          <td>{player.position}</td>
          <td>{player.id}</td>
          <td>
            <Button close onClick={() => removePlayer(player.id)} />
          </td>
        </tr>
      ))
      // Show add user section
      addUsers = (
        <div>
          <Label for="playerID-input">Player ID</Label>
          <Input
            type="number"
            name="playerID"
            id="playerID-input"
            value={playerIDInput}
            onChange={e => setPlayerIDInput(e.target.value)}
          />
          <Button onClick={addPlayer}>Add Player</Button>
        </div>
      )
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
        {addUsers}
        {adminMessage}
        {userTable}
      </Container>
    </>
  )
}

export default EditPlayers
