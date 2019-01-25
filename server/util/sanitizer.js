const _ = require('lodash')

const getPlayer = player => ({
  id: player.espnID,
  name: _.get(player, 'athlete.displayName', player.name),
  firstName: _.get(player, 'athlete.firstName', player.name && player.name.split(' ')[0]),
  lastName: _.get(player, 'athlete.lastName', player.name && player.name.split(' ')[1]),
  headshot: _.get(player, 'athlete.headshot.href', null),
  position: _.get(player, 'athlete.position.abbreviation', 'N/A'),
  number: _.get(player, 'athlete.displayJersey', '00'),
  team: _.get(player, 'athlete.team.name', 'N/A'),
  teamLogo: _.get(player, 'athlete.team.logos.0.href', null),
  stats: _.get(player, 'athlete.statsSummary.statistics', []),
  conference: _.get(player, 'conference', null),
})

const getCaptain = captain => ({
  ...getPlayer(captain),
  year: _.get(captain, 'year', null),
})

const getUser = user => ({
  id: user.twitterID,
  photoURL: user.photoURL,
  name: user.name,
  lastLogin: user.lastLogin,
  isAdmin: user.isAdmin,
  isInvited: user.isInvited,
})

const getEntry = entry => ({
  captainName: entry.captain.name,
  pickOrder: entry.pickOrder,
  ...getPlayer(entry),
})

module.exports = {
  getPlayer,
  getCaptain,
  getUser,
  getEntry,
}
