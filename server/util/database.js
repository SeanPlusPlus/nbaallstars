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

function removeAllstar(id, year) {
  return Allstar.findOne({
    include: [{
      model: Player,
      where: {
        espnID: id,
      },
    }],
    where: {
      yearId: year,
    },
  }).then(player => Allstar.destroy({
    where: {
      id: _.get(player, 'dataValues.id', {}),
    },
  }))
}

function addAllstars(ids, year) {
  return Player.findAll({
    where: {
      espnID: ids,
    },
  }).then((response) => {
    const allstarPromises = response.map(r => _.get(r, 'dataValues.id', {})).map(playerId => Allstar.create({
      playerId,
      yearId: year,
    }))
    return Promise.all(allstarPromises)
  })
}

function getAllYears() {
  return Year.findAll().then((response) => {
    return response.map(r => _.get(r, 'dataValues.id', {}))
  })
}

function getPlayersThatArentAllstars(year) {
  const allTables = [
    Player.findAll(),
    Allstar.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      where: {
        yearId: year,
      },
    }),
    Captain.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      where: {
        yearId: year,
      },
    }),
  ]
  return Promise.all(allTables).then((tables) => {
    const players = tables[0].map(x => _.get(x, 'dataValues', {}))
    const allstars = tables[1].map(x => _.get(x, 'dataValues', {}))
    const captains = tables[2].map(x => _.get(x, 'dataValues', {}))

    const results = players.filter((player) => {
      let isAnAllstarorCaptain = false
      allstars.forEach((allstar) => {
        if (allstar.playerId === player.id) {
          isAnAllstarorCaptain = true
        }
      })
      captains.forEach((allstar) => {
        if (allstar.playerId === player.id) {
          isAnAllstarorCaptain = true
        }
      })
      return !isAnAllstarorCaptain
    })
    return results
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
  getPlayersThatArentAllstars,
  removeAllstar,
  addAllstars,
}
