const Sequelize = require('sequelize')
const sequelize = require('./connection')

const User = sequelize.define('user', {
  id: { type: Sequelize.STRING, primaryKey: true },
  accessToken: { type: Sequelize.STRING, unique: true },
  accessTokenSecret: { type: Sequelize.STRING, unique: true },
})

// User.sync()

module.exports = User
