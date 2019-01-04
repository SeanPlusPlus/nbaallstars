const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')
const User = require('./user')
const Year = require('./year')

const Score = sequelize.define('score', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  score: { type: Sequelize.INTEGER },
})

Score.belongsTo(User)
Score.belongsTo(Year)

module.exports = Score
