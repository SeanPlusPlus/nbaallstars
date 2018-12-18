const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

const Captain = require('../models/captain')
const Player = require('../models/player')

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
