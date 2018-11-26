const User = require('./User')
const Player = require('./Player')

User.sync({ force: true })
Player.sync({ force: true })
