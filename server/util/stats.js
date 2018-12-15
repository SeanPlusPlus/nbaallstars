const rp = require('request-promise')

function getPlayerStats(players) {
  const promises = players.map(player => rp.get(player.espnUrl))
  return Promise.all(promises)
    .then(playerStats => playerStats.map(playerStat => JSON.parse(playerStat)))
}

module.exports = {
  getPlayerStats,
}
