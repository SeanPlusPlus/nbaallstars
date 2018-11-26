const fs = require('fs')

const Player = require('./Player')

const data = fs.readFileSync('./data/players.json')

const { players } = JSON.parse(data)

players.forEach((p) => {
  Player.findOrCreate({ where: p })
})
