import _ from 'lodash'
import jersey from '../assets/basketball-jersey.svg'

const request = require('./request')


const getSanitizedPlayer = player => ({
  id: player.espnID,
  name: _.get(player, 'athlete.displayName', player.name),
  firstName: _.get(player, 'athlete.firstName', player.name.split(' ')[0]),
  lastName: _.get(player, 'athlete.lastName', player.name.split(' ')[1]),
  headshot: _.get(player, 'athlete.headshot.href', jersey),
  position: _.get(player, 'athlete.position.abbreviation', 'N/A'),
  number: _.get(player, 'athlete.displayJersey', '00'),
  team: _.get(player, 'athlete.team.name', 'N/A'),
  teamLogo: _.get(player, 'athlete.team.logos.0.href', jersey), // TODO: New logo
  stats: _.get(player, 'athlete.statsSummary.statistics', []),
  conference: _.get(player, 'conference', null),
})

const removePlayer = playerID => request.get(`/api/remove-player?playerID=${playerID}`)

const addPlayer = playerID => request.get(`/api/add-player?playerID=${playerID}`)

const removeAllstar = (playerID, year) => {
  console.log(`TODO: Remove ${playerID} in ${year} now`)
}

export default {
  getSanitizedPlayer,
  removePlayer,
  addPlayer,
  removeAllstar,
}
