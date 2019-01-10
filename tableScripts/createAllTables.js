const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

const Player = require('../models/player')
const Year = require('../models/year')
const User = require('../models/user')

const Allstar = require('../models/allstar')
const Score = require('../models/score')
const Captain = require('../models/captain')

const Result = require('../models/result')
const Entry = require('../models/entry')

const sequelize = require('../models/connection')

Promise.all([
  Player.sync({ force: true }),
  Year.sync({ force: true }),
  User.sync({ force: true }),
]).then(() => {
  Promise.all([
    Allstar.sync({ force: true }),
    Score.sync({ force: true }),
    Captain.sync({ force: true }),
  ]).then(() => {
    Promise.all([
      Result.sync({ force: true }),
      Entry.sync({ force: true }),
    ]).then(() => {
      sequelize.close()
    })
  })
})
