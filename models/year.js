const Sequelize = require('sequelize')
const sequelize = require('./connection')

const Year = sequelize.define('year', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
})

module.exports = Year
