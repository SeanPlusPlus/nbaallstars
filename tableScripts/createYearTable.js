const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })
const Year = require('../models/year')

Year.sync({ force: true }).then(() => {
  Year.bulkCreate([
    {
      id: 2018,
    },
    {
      id: 2019,
    },
  ])
})
