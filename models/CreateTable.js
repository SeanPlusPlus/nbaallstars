const User = require('./user')
const Player = require('./player')

User.sync({ force: true })
Player.sync({ force: true })
