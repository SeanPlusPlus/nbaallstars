const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')

const testUsers = JSON.parse(fs.readFileSync('../data/users.json', 'utf8'))
User.bulkCreate(testUsers)
