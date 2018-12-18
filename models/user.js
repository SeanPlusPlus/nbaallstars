const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const sequelize = require('./connection')

const User = sequelize.define('user', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
  twitterID: { type: Sequelize.STRING, unique: true },
  accessToken: { type: Sequelize.STRING, unique: true },
  accessTokenSecret: { type: Sequelize.STRING, unique: true },
  isAdmin: { type: Sequelize.BOOLEAN, unique: false },
  isInvited: { type: Sequelize.BOOLEAN, unique: false },
  photoURL: { type: Sequelize.STRING, unique: true },
  lastLogin: { type: Sequelize.STRING, unique: false },
  name: { type: Sequelize.STRING, unique: false },
})

module.exports = User
