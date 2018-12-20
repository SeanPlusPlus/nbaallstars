const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')

const USER_ID = '51766287'

User.update(
  { isAdmin: true },
  { where: { twitterID: USER_ID } },
)
