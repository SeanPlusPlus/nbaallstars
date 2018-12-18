const Sequelize = require('sequelize')
const sequelize = require('./connection')
const Player = require('./player')

const Captain = sequelize.define('captain', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
})

Captain.belongsTo(Player)

module.exports = Captain
