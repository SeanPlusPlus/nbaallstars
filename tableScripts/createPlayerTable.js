const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Player = require('../models/player')

Player.sync({ force: true })
