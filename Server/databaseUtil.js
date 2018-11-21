const User = require('../Models/User')
const Player = require('../Models/Player')

function getUserFromID(userID) {
  return User.findOne({ where: { id: userID } })
}

function getAllUsers() {
  return User.findAll()
}

function getAllPlayers() {
  return Player.findAll()
}

module.exports = {
  getUserFromID,
  getAllUsers,
  getAllPlayers,
}
