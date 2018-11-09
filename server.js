const serverless = require('serverless-http')
const express = require('express')
const rp = require('request-promise')
const dotenv = require('dotenv')

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

if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports.handler = serverless(app)
