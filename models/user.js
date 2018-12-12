const Sequelize = require('sequelize')
const sequelize = require('./connection')

const User = sequelize.define('user', {
  id: { type: Sequelize.STRING, primaryKey: true },
  accessToken: { type: Sequelize.STRING, unique: true },
  accessTokenSecret: { type: Sequelize.STRING, unique: true },
  isAdmin: { type: Sequelize.BOOLEAN, unique: false },
  isInvited: { type: Sequelize.BOOLEAN, unique: false },
})

// User.sync()

module.exports = User
