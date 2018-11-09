const serverless = require('serverless-http')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const { NODE_ENV } = process.env

const app = express()

app.get('/api', (req, res) => {
  const message = 'hello world!'
  res.send({ message })
})

if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports.handler = serverless(app)
