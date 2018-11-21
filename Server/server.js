const serverless = require('serverless-http')
const express = require('express')
const rp = require('request-promise')
const dotenv = require('dotenv')
const _ = require('lodash')
const dbUtil = require('./databaseUtil')
const twitter = require('./twitter')
const util = require('./util')

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

app.get('/api/players', (req, res) => {
  dbUtil.getAllPlayers().then((response) => {
    const players = response.map(r => _.get(r, 'dataValues', {}))
    res.send({ players })
  })
})

app.get('/api/users', (req, res) => {
  dbUtil.getAllUsers().then((response) => {
    const users = response.map(r => _.get(r, 'dataValues', {}))
    console.log('users', users) // eslint-disable-line no-console
    res.send({ users })
  })
})

app.get('/twitter/request-token', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  twitter.getRequestToken().then((requestTokens) => {
    res.send({ requestTokens })
  }).catch((error) => {
    res.status(500)
    res.send({ message: 'Error getting request token', error })
  })
})

app.get('/twitter/access-token', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    authToken,
    authTokenSecret,
    authVerifier,
  } = req.query
  twitter.getAccessToken(authToken, authTokenSecret, authVerifier).then((accessData) => {
    const {
      accessToken,
      accessTokenSecret,
      userID,
    } = accessData
    const cookie = util.createUserCookie(accessToken, accessTokenSecret, userID)
    res.send({ cookieToStore: cookie })
  }).catch((error) => {
    res.status(500)
    res.send({ message: 'Error getting access token', error })
  })
})

app.get('/twitter/get-user', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    userID,
    tokenHash,
  } = util.decryptUserCookie(req.query.userCookie)
  dbUtil.getUserFromID(userID).then((userData) => {
    const {
      accessToken,
      accessTokenSecret,
    } = userData.dataValues
    if (util.checkUserVerification(tokenHash, accessToken, accessTokenSecret)) {
      // eslint-disable-next-line no-console
      console.log('USER VERIFIED')
    } else {
      // eslint-disable-next-line no-console
      console.log('USER NOT VERIFIED')
    }
  })
})

if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // eslint-disable-line no-console
}

module.exports.handler = serverless(app)
