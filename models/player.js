const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')

const Player = sequelize.define('player', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  espnID: { type: Sequelize.STRING, unique: true },
  name: { type: Sequelize.STRING },
})

module.exports = Player
