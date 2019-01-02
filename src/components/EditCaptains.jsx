import React, { useEffect, useState } from 'react'
import {
  Card,
  CardImg, Container,
  CardBody, CardTitle,
  CardSubtitle,
} from 'reactstrap'

import request from '../utils/request'
import playerUtil from '../utils/playerUtil'

// styles
import '../styles/EditCaptains.css'

// local components
import Nav from './Nav'

const EditCaptains = () => {
  const [captains, setCaptains] = useState()
  useEffect(() => {
    request.get('/api/captains').then((x) => {
      const newCaptains = {}
      x.players.forEach((captain) => {
        if (!newCaptains[captain.year]) {
          newCaptains[captain.year] = {}
        }
        newCaptains[captain.year][captain.conference] = playerUtil.getSanitizedPlayer(captain)
      })
      setCaptains(newCaptains)
    })
  }, [])

  let captainCards
  if (captains) {
    captainCards = Object.keys(captains)
      .map(year => Object.keys(captains[year]).map((conference) => {
        const captain = captains[year][conference]
        return (
          <div className={`captain-card ${captain.conference}-captain`} key={captain.id}>
            <div className="conference-title">
              {captain.conference[0].toUpperCase() + captain.conference.substring(1)}
            </div>
            <Card>
              <CardImg top width="100%" src={captain.headshot} alt="captain headshot" />
              <CardBody>
                <CardTitle>{captain.name}</CardTitle>
                <CardSubtitle>
                  {`${captain.position} ${captain.number} - ${captain.team}`}
                </CardSubtitle>
              </CardBody>
            </Card>
          </div>
        )
      }))
  }

  return (
    <>
      <Nav />
      <Container id="main">
        {captainCards}
      </Container>
    </>
  )
}

export default EditCaptains
