const rp = require('request-promise')

const ESPN_URL = 'http://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/'

function getPlayerStats(players) {
  const promises = players.map(player => rp.get(`${ESPN_URL}${player.id}`))
  return Promise.all(promises)
    .then(playerStats => playerStats.map(playerStat => JSON.parse(playerStat)))
}

function getPlayerName(playerID) {
  return rp.get(`${ESPN_URL}${playerID}`).then((data) => {
    const playerData = JSON.parse(data)
    return playerData.athelete.displayName
  }).catch(() => null)
}

module.exports = {
  getPlayerStats,
  getPlayerName,
}
