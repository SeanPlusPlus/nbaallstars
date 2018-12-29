const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Allstar = require('../models/allstar')

Allstar.sync({ force: true })
