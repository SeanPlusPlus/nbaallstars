const User = require('../../models/user')
const Player = require('../../models/player')
const twitter = require('./twitter')

function getUserFromID(userID) {
  return User.findOne({ where: { id: userID } })
}

function getAllUsers() {
  return User.findAll()
}

function createUserIfDoesntExist(id, accessToken, accessTokenSecret) {
  return new Promise((resolve, reject) => {
    getUserFromID(id).then((user) => {
      if (!user) {
        twitter.getUserInfo(accessToken, accessTokenSecret).then((data) => {
          User.upsert({
            id,
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
          { where: { id } },
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
