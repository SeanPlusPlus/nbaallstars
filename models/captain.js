const Sequelize = require('sequelize')
const sequelize = require('./connection')
const Player = require('../models/player')
const Year = require('../models/year')

const Captain = sequelize.define('captain', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
})

Captain.belongsTo(Player)
Captain.belongsTo(Year)

module.exports = Captain
