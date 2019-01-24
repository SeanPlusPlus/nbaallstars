const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')
const User = require('./user')
const Player = require('./player')
const Captain = require('./captain')

const Entry = sequelize.define('entry', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  pickOrder: { type: Sequelize.INTEGER },
})

Entry.belongsTo(User)
Entry.belongsTo(Player)
Entry.belongsTo(Captain)

module.exports = Entry
