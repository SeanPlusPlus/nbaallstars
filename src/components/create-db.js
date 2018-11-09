const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const {
  PG_PASSWORD,
  PG_USERNAME,
} = process.env

const username = PG_USERNAME
const password = PG_PASSWORD
const database = 'nbaallstars'
const host = 'nbaallstars.cr2qruscddso.us-west-2.rds.amazonaws.com'

console.log(username, password)


// const sequelize = new Sequelize(database, username, password, {
//   host,
//   port: 5432,
//   logging: console.log,
//   maxConcurrentQueries: 100,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: 'Amazon RDS',
//   },
//   pool: { maxConnections: 5, maxIdleTime: 30 },
//   language: 'en',
// })


// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE,
// })

// sequelize.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
//   }))
//   .then((jane) => {
//     console.log(jane.toJSON())
//   })
