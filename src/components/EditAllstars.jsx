import React, { useEffect, useState } from 'react'
import {
  Input, Container, Button,
} from 'reactstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import request from '../utils/request'
import playerUtil from '../utils/playerUtil'

// styles
// import '../styles/EditAllstars.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

// local components
import Nav from './Nav'
import PlayerTable from './PlayerTable'

const DEFAULT_YEAR = 2018

const EditAllstars = () => {
  const [allstars, setAllstars] = useState()
  const [yearSelected, setYearSelected] = useState(DEFAULT_YEAR)
  const [years, setYears] = useState([DEFAULT_YEAR])
  const [otherPlayers, setOtherPlayers] = useState()
  const [playersSelected, setPlayersSelected] = useState([])

  function refreshPlayerData(year) {
    request.get(`/api/allstars/${year}`).then((x) => {
      setAllstars(x.players)
    })
    request.get(`/api/non-allstars/${yearSelected}`).then((x) => {
      setOtherPlayers(x.players)
    })
  }

  useEffect(() => {
    refreshPlayerData(yearSelected)
  }, [])

  useEffect(() => {
    request.get('/api/years').then((x) => {
      setYears(x.years)
    })
  }, [])

  function removeAllstar(playerID) {
    playerUtil.removeAllstar(playerID, yearSelected).then(() => {
      refreshPlayerData(yearSelected)
    })
  }

  function addAllstars() {
    const playerIDs = playersSelected.map(x => x.espnID)
    playerUtil.addAllstars(playerIDs, yearSelected).then(() => {
      refreshPlayerData(yearSelected)
    })
  }

  function selectDifferentYear(newYear) {
    const year = newYear.target.value
    setYearSelected(year)
    refreshPlayerData(year)
  }

  function setPlayers(players) {
    setPlayersSelected(otherPlayers.filter(x => players.includes(x.name)))
  }

  let allstarsTable
  if (allstars) {
    allstarsTable = (
      <PlayerTable removePlayer={removeAllstar} players={allstars} />
    )
  }

  let otherPlayersDropdown
  if (otherPlayers) {
    otherPlayersDropdown = (
      <>
        <Typeahead
          labelKey="players"
          multiple
          options={otherPlayers.map(x => x.name)}
          placeholder="Add players..."
          onChange={setPlayers}
        />
        <Button onClick={addAllstars}>
          Submit
        </Button>
      </>
    )
  }

  const yearOptions = years.map(year => (
    <option key={year}>
      {year}
    </option>
  ))

  return (
    <>
      <Nav />
      <Container id="main">
        <Input type="select" value={yearSelected} onChange={selectDifferentYear}>
          {yearOptions}
        </Input>
        {otherPlayersDropdown}
        {allstarsTable}
      </Container>
    </>
  )
}

export default EditAllstars
