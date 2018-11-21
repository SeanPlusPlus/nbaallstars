const Sequelize = require('sequelize')
const sequelize = require('./connection')

const Player = sequelize.define('player', {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
})

Player.sync()

module.exports = Player
