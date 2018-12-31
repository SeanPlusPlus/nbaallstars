import React, { useEffect, useState } from 'react'
import {
  Input, Container,
} from 'reactstrap'

import request from '../utils/request'
import playerUtil from '../utils/playerUtil'

// styles
// import '../styles/EditAllstars.css'

// local components
import Nav from './Nav'
import PlayerTable from './PlayerTable'

const DEFAULT_YEAR = 2018

const EditAllstars = () => {
  const [allstars, setAllstars] = useState()
  const [yearSelected, setYearSelected] = useState(DEFAULT_YEAR)
  const [years, setYears] = useState([DEFAULT_YEAR])

  function refreshPlayerData(year) {
    request.get(`/api/allstars/${year}`).then((x) => {
      const newAllstars = x.players.map(player => playerUtil.getSanitizedPlayer(player))
      setAllstars(newAllstars)
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

  function selectNewYear(newYear) {
    const year = newYear.target.value
    setYearSelected(year)
    refreshPlayerData(year)
  }

  let allstarsTable
  if (allstars) {
    allstarsTable = (
      <PlayerTable removePlayer={removeAllstar} players={allstars} />
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
        <Input type="select" value={yearSelected} onChange={selectNewYear}>
          {yearOptions}
        </Input>
        {allstarsTable}
      </Container>
    </>
  )
}

export default EditAllstars
