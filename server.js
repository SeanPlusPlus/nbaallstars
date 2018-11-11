const serverless = require('serverless-http')
const express = require('express')
const rp = require('request-promise')
const dotenv = require('dotenv')
const OAuth = require('oauth')

dotenv.config()

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'jJ8BvM2ZVzhy4D0Dj1cOffK8l',
  'mMuoWNpjUx4Dp1pTSFsODWd352lKDzbJetW9ZdI1WCsjYpFNPc',
  '1.0A',
  null,
  'HMAC-SHA1'
)

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

app.get('/twitter/request-token', (req, res) => {
  res.header({'Access-Control-Allow-Origin': '*'})
  logInWithTwitter().then((token) => {
    res.send({token: token})
  }).catch((error) => {
    res.status(500)
    res.send({ message: 'Error getting request token', error: error})
  })
})

function logInWithTwitter() {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken({ oauth_callback: 'http://localhost:3000' }, function (error, token, tokenSecret, parsedQueryString) {
      if (error) {
        console.log(error)
        reject(new Error(error))
      } else {
        console.log(token)
        console.log(tokenSecret)
        console.log(parsedQueryString)
        resolve(token)
      }
    })
  })
}

if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // eslint-disable-line no-console
}

module.exports.handler = serverless(app)
