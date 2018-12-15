const rp = require('request-promise')

function getPlayerStats(players) {
  const promises = players.map(player => rp.get(player.espnUrl))
  return Promise.all(promises).then((playerStats) => {
    console.log(playerStats)
    return playerStats.map(playerStat => JSON.parse(playerStat))
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = {
  getPlayerStats,
}
