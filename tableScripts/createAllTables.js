const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Allstar = require('../models/allstar')
const Captain = require('../models/captain')
const Player = require('../models/player')
const Result = require('../models/result')
const User = require('../models/user')
const Year = require('../models/year')
const sequelize = require('../models/connection')

const noDependencies = []
noDependencies.push(Player.sync({ force: true }))
noDependencies.push(Year.sync({ force: true }))
noDependencies.push(User.sync({ force: true }))
Promise.all(noDependencies).then(() => {
  Allstar.sync({ force: true })
  Captain.sync({ force: true }).then(() => {
    Result.sync({ force: true }).then(() => {
      sequelize.close()
    })
  })
})
