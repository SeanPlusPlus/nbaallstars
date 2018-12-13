const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')

const testUsers = JSON.parse(fs.readFileSync('testUsers.json', 'utf8'))
console.log(process.env.NODE_ENV)
User.bulkCreate(testUsers)
