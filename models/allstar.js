const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')
const Player = require('./player')
const Year = require('./year')

const Allstar = sequelize.define('allstar', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
})

Allstar.belongsTo(Player)
Allstar.belongsTo(Year)

module.exports = Allstar
