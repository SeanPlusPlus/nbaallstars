const User = require('../../models/user')
const Player = require('../../models/player')

function getUserFromID(userID) {
  return User.findOne({ where: { id: userID } })
}

function getAllUsers() {
  return User.findAll()
}

function createUserIfDoesntExist(id, accessToken, accessTokenSecret) {
  return getUserFromID(id).then((user) => {
    if (!user) {
      User.upsert({
        id,
        accessToken,
        accessTokenSecret,
        isAdmin: false,
        isInvited: false,
      })
    }
  })
}

function getAllPlayers() {
  return Player.findAll()
}

function addUserToGame(user) {
  return User.update(
    { isInvited: true },
    { where: { id: user.id } },
  )
}

module.exports = {
  getUserFromID,
  getAllUsers,
  createUserIfDoesntExist,
  getAllPlayers,
  addUserToGame,
}
