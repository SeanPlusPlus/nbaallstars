const Sequelize = require('sequelize')
const connection = require('./connection')

const User = connection.define('user', {
  id: { type: Sequelize.STRING, primaryKey: true },
  accessToken: { type: Sequelize.STRING, unique: true },
  accessTokenSecret: { type: Sequelize.STRING, unique: true },
})

module.exports = User
