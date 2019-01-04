const request = require('./request')

const removePlayer = playerID => request.remove(`/api/player/${playerID}`)

const addPlayer = playerID => request.post(`/api/player/${playerID}`)

const removeAllstar = (playerID, year) => request.remove(`/api/allstars/${year}/${playerID}`)

const addAllstars = (playerIDs, year) => request.post(`/api/allstars/${year}/${playerIDs}`)

export default {
  removePlayer,
  addPlayer,
  removeAllstar,
  addAllstars,
}
