const User = require('../../models/User')
const Player = require('../../models/Player')

function getUserFromID(userID) {
  return User.findOne({ where: { id: userID } })
}

function getAllUsers() {
  return User.findAll()
}

function updateOrCreateUser(id, accessToken, accessTokenSecret) {
  return User.upsert({
    id,
    accessToken,
    accessTokenSecret,
  })
}

function getAllPlayers() {
  return Player.findAll()
}

module.exports = {
  getUserFromID,
  getAllUsers,
  updateOrCreateUser,
  getAllPlayers,
}
