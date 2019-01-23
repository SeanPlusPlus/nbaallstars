import React, { useEffect, useState } from 'react'
import {
  Button, Label,
  Input, Container,
} from 'reactstrap'

import request from '../utils/request'
import playerUtil from '../utils/playerUtil'

// local components
import PlayerTable from './PlayerTable'
import Nav from './Nav'

const EditPlayers = () => {
  const [players, setPlayers] = useState([])
  const [playerIDInput, setPlayerIDInput] = useState([])
  function refreshPlayerData() {
    request.get('/api/players').then((data) => {
      setPlayers(data.players)
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
  const addUsers = (
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

  return (
    <>
      <Nav />
      <Container id="main">
        {addUsers}
        <PlayerTable removePlayer={removePlayer} players={players} />
      </Container>
    </>
  )
}

export default EditPlayers
