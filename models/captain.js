const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')
const Player = require('./player')
const Year = require('./year')

const Captain = sequelize.define('captain', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  conference: { type: Sequelize.STRING },
})

Captain.belongsTo(Player)
Captain.belongsTo(Year)

module.exports = Captain
