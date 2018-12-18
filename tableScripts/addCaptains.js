const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Captain = require('../models/captain')
const Player = require('../models/player')

const testCaptains = JSON.parse(fs.readFileSync('../data/captains.json', 'utf8'))
Captain.bulkCreate(testCaptains)
