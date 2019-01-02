const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const User = require('../models/user')
const sequelize = require('../models/connection')

const USER_ID = '51766287'

User.update(
  { isAdmin: true },
  { where: { twitterID: USER_ID } },
).then(() => {
  sequelize.close()
})
