const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Captain = require('../models/captain')

Captain.sync({ force: true })
