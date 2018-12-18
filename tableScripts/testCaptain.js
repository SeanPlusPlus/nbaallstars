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

getAllCaptains().then((data) => {
  console.log(data[0].dataValues)
})
