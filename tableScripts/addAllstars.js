const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Allstar = require('../models/allstar')

const testAllstars = JSON.parse(fs.readFileSync('../data/allstars.json', 'utf8'))
Allstar.bulkCreate(testAllstars)
