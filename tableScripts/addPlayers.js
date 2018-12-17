const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

const Player = require('../models/player')

const data = fs.readFileSync('../data/players.json')

const { players } = JSON.parse(data)

players.forEach((p) => {
  Player.findOrCreate({ where: p })
})
