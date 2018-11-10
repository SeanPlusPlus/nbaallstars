const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const {
  PG_PASSWORD,
  PG_USERNAME,
  PG_DATABASE,
  PG_HOST,
} = process.env

const username = PG_USERNAME
const password = PG_PASSWORD
const database = PG_DATABASE
const host = PG_HOST

const sequelize = new Sequelize(database, username, password, {
  host,
  port: 5432,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'postgres',
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
})

User.findAll().then((users) => {
  console.log('users', users) // eslint-disable-line no-console
})
