const fs = require('fs')

const Player = require('./player')

const data = fs.readFileSync('./data/players.json')

const { players } = JSON.parse(data)

players.forEach((p) => {
  Player.findOrCreate({ where: p })
})
