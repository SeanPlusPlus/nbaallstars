const serverless = require('serverless-http')
const express = require('express')
const rp = require('request-promise')
const dotenv = require('dotenv')
const _ = require('lodash')
const { User, sequelize } = require('./model')

dotenv.config()

const {
  NODE_ENV,
  ESPN_API,
} = process.env

const app = express()

app.get('/api', (req, res) => {
  const options = {
    uri: ESPN_API,
    method: 'GET',
  }
  rp(options)
    .then((response) => {
      const json = JSON.parse(response)
      const sports = json.sports.map(s => s.slug)
      res.send({ sports })
    })
    .catch(() => {
      res.status(400)
      res.send({ message: 'error connecting to api' })
    })
})

app.get('/api/users', (req, res) => {
  User.findAll().then((response) => {
    const users = response.map(r => _.get(r, 'dataValues', {}))
    console.log('users', users) // eslint-disable-line no-console
    res.send({ users })
    sequelize.close()
  })
})


if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // eslint-disable-line no-console
}

module.exports.handler = serverless(app)
