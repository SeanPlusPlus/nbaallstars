const User = require('../../models/user')
const Player = require('../../models/player')

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
    isAdmin: false,
    isInvited: false,
  })
}

function getAllPlayers() {
  return Player.findAll()
}

function addUserToGame(user) {
  User.update(
    { isInvited: true },
    { where: user.id },
  )
}

module.exports = {
  getUserFromID,
  getAllUsers,
  updateOrCreateUser,
  getAllPlayers,
  addUserToGame,
}
