const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Captain = require('../models/captain')

const testCaptains = JSON.parse(fs.readFileSync('../data/captains.json', 'utf8'))
Captain.bulkCreate(testCaptains)
