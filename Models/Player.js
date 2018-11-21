const Sequelize = require('sequelize')
const sequelize = require('./connection')

const Player = sequelize.define('player', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  captain: { type: Sequelize.STRING },
})

Player.sync()

module.exports = Player
