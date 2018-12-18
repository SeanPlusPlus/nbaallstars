const User = require('../../models/user')
const Player = require('../../models/player')
const twitter = require('./twitter')
const stats = require('./stats')

function getUserFromID(userID) {
  return User.findOne({ where: { twitterID: userID } })
}

function getAllUsers() {
  return User.findAll({
    order: [
      ['lastLogin', 'DESC'],
      ['name', 'ASC'],
    ],
  })
}

function createUserIfDoesntExist(twitterID, accessToken, accessTokenSecret) {
  return new Promise((resolve, reject) => {
    getUserFromID(twitterID).then((user) => {
      if (!user) {
        twitter.getUserInfo(accessToken, accessTokenSecret).then((data) => {
          User.upsert({
            twitterID,
            accessToken,
            accessTokenSecret,
            isAdmin: false,
            isInvited: false,
            photoURL: data.profile_image_url,
            lastLogin: Date.now(),
            name: data.name,
          }).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        })
      } else {
        User.update(
          { lastLogin: Date.now() },
          { where: { twitterID } },
        ).then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
      }
    })
  })
}

function getAllPlayers() {
  return Player.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['name', 'ASC'],
    ],
  })
}

function addUserToGame(user) {
  return User.update(
    { isInvited: true },
    { where: { twitterID: user.twitterID } },
  )
}

function removePlayer(playerID) {
  return Player.destroy({
    where: {
      id: playerID,
    },
  })
}

function addPlayer(playerID) {
  return stats.getPlayerName(playerID).then(playerName => (Player.findOrCreate({
    where: {
      id: playerID,
      name: playerName,
    },
  })))
}

module.exports = {
  getUserFromID,
  getAllUsers,
  createUserIfDoesntExist,
  getAllPlayers,
  addUserToGame,
  removePlayer,
  addPlayer,
}
