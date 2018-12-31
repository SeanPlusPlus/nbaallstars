const _ = require('lodash')

const User = require('../../models/user')
const Player = require('../../models/player')
const Captain = require('../../models/captain')
const Allstar = require('../../models/allstar')
const Year = require('../../models/year')
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
      espnID: playerID,
    },
  })
}

function addPlayer(playerID) {
  return stats.getPlayerName(playerID).then(playerName => (Player.findOrCreate({
    where: {
      espnID: playerID,
      name: playerName,
    },
  })))
}

function getCaptainsWithESPNID(espnID, year) {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    include: [
      {
        model: Player,
        where: {
          espnID,
        },
      },
    ],
    where: {
      yearId: year,
    },
  })
}

function getCaptainsForYear(year) {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    include: [
      { model: Player },
    ],
    where: {
      yearId: year,
    },
  })
}

function getCaptains() {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    include: [
      { model: Player },
    ],
  }).then(response => response.map(captain => ({
    ..._.get(captain, 'dataValues.player.dataValues', {}),
    conference: captain.conference,
    year: captain.yearId,
  })))
}

function getAllstarsForYear(year) {
  return Allstar.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    include: [
      { model: Player },
    ],
    where: {
      yearId: year,
    },
  })
}

function getAllYears() {
  return Year.findAll().then((response) => {
    return response.map(r => _.get(r, 'dataValues.id', {}))
  })
}

module.exports = {
  getUserFromID,
  getAllUsers,
  createUserIfDoesntExist,
  getAllPlayers,
  addUserToGame,
  removePlayer,
  addPlayer,
  getCaptainsForYear,
  getAllstarsForYear,
  getCaptainsWithESPNID,
  getAllYears,
  getCaptains,
}
