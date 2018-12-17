import _ from 'lodash'
import jersey from '../assets/basketball-jersey.svg'

const request = require('./request')


const getSanitizedPlayer = player => ({
  id: player.id,
  name: _.get(player, 'athlete.displayName', player.name),
  headshot: _.get(player, 'athlete.headshot.href', jersey),
  position: _.get(player, 'athlete.position.abbreviation', 'N/A'),
  number: _.get(player, 'athlete.displayJersey', '00'),
  team: _.get(player, 'athlete.team.name', 'N/A'),
  teamLogo: _.get(player, 'athlete.team.logos.0.href', jersey), // TODO: New logo
  stats: _.get(player, 'athlete.statsSummary.statistics', []),
})

const removePlayer = playerID => request.get(`/api/remove-player?playerID=${playerID}`)

const addPlayer = playerID => request.get(`/api/add-player?playerID=${playerID}`)

export default {
  getSanitizedPlayer,
  removePlayer,
  addPlayer,
}
