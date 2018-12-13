const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')

const USER_ID = '1234567890'

User.update(
  { isAdmin: true },
  { where: { id: USER_ID } },
)
