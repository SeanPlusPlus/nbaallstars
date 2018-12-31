const dotenv = require('dotenv')
const _ = require('lodash')

const sequelize = require('../models/connection')

dotenv.config({ path: '../.env' })

const Captain = require('../models/captain')
const Allstar = require('../models/allstar')
const Player = require('../models/player')
const Result = require('../models/result')

function getAllCaptains() {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['name', 'ASC'],
    ],
    include: [
      { model: Player },
    ],
  })
}

// getAllCaptains().then((data) => {
//   console.log(data[0].dataValues)
// })

function getCaptainsForYear(year) {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['name', 'ASC'],
    ],
    include: [
      { model: Player },
    ],
    where: {
      yearId: year,
    },
  })
}

// getCaptainsForYear(2018).then((data) => {
//   console.log(data)
// })

function getAllstarsForYear(year) {
  return Allstar.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['name', 'ASC'],
    ],
    include: [
      { model: Player },
    ],
    where: {
      yearId: year,
    },
  })
}

// getAllstarsForYear(2018).then((data) => {
//   console.log(data)
// })

function getCaptainsWithName(name) {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['name', 'ASC'],
    ],
    include: [
      { model: Player, where: { name } },
    ],
  })
}

// getCaptainsWithName('Steph Curry X').then((data) => {
//   console.log(data)
// })


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

// getCaptainsWithESPNID('3975', 2018).then((data) => {
//   console.log(data)
// })

function getCaptains() {
  return Captain.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
  })
}

// getCaptains().then((data) => {
//   console.log(data.map(player => _.get(player, 'dataValues', {})))
// })

function getPlayersThatArentAllstars() {
  return Player.findAll({
    include: [{
      model: Allstar,
    }],
  })
}

getPlayersThatArentAllstars().then((players) => {
  console.log(players)
  sequelize.close()
})
