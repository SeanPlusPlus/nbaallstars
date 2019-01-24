const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

const Allstar = require('../models/allstar')
const Captain = require('../models/captain')
const Player = require('../models/player')
const Result = require('../models/result')
const User = require('../models/user')
const Year = require('../models/year')
const Entry = require('../models/entry')
const sequelize = require('../models/connection')

const playersData = fs.readFileSync('../data/players.json')
const usersData = fs.readFileSync('../data/users.json')
const resultsData = fs.readFileSync('../data/results.json')
const entriesData = fs.readFileSync('../data/entries.json')

const { players, captains, allstars } = JSON.parse(playersData)
const { users } = JSON.parse(usersData)
const { results } = JSON.parse(resultsData)
const { entries } = JSON.parse(entriesData)
const years = [2018, 2019]


const noDependencies = []
noDependencies.push(Player.bulkCreate(players))
noDependencies.push(User.bulkCreate(users))
noDependencies.push(Year.bulkCreate(years.map(year => ({ id: year }))))

Promise.all(noDependencies).then(() => {
  Promise.all(
    [
      Allstar.bulkCreate(allstars),
      Captain.bulkCreate(captains),
    ],
  ).then(() => {
    Entry.bulkCreate(entries).then(() => {
      sequelize.close()
    })
  })
})
