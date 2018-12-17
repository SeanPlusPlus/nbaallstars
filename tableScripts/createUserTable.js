const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')

User.sync({ force: true })
