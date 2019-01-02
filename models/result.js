const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')
const Player = require('./player')
const Captain = require('./captain')

const Result = sequelize.define('result', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  pickOrder: { type: Sequelize.INTEGER },
})

Result.belongsTo(Player)
Result.belongsTo(Captain)


module.exports = Result
