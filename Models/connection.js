const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const {
  NODE_ENV,
  PG_PASSWORD,
  PG_USERNAME,
  PG_DATABASE,
  PG_HOST,
} = process.env

const username = PG_USERNAME
const password = PG_PASSWORD
const database = PG_DATABASE
const host = PG_HOST

const { Op } = Sequelize

const sequelize = new Sequelize(database, username, password, {
  host,
  port: 5432,
  logging: console.log, // eslint-disable-line no-console
  maxConcurrentQueries: 100,
  dialect: 'postgres',
  dialectOptions: (NODE_ENV === 'development' ? undefined : { ssl: 'Amazon RDS' }),
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like,
  },
})

module.exports = sequelize
