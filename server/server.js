const serverless = require('serverless-http')
const express = require('express')
const dotenv = require('dotenv')
const _ = require('lodash')
const cookieParser = require('cookie-parser')
const database = require('./util/database')
const twitter = require('./util/twitter')
const session = require('./util/session')
const stats = require('./util/stats')
const { auth, admin, invited } = require('./auth')

dotenv.config()

const {
  NODE_ENV,
  ADD_USER_PASSCODE,
} = process.env

const app = express()
app.use(cookieParser())

// TODO: Add to middlewear? res.header({ 'Access-Control-Allow-Origin': '*' })

app.get('/api/profile', auth, (req, res) => {
  res.send(req.profile.user)
})

app.get('/api/users', auth, admin, (req, res) => {
  database.getAllUsers().then((response) => {
    const users = response.map(r => _.get(r, 'dataValues', {}))
    res.send({ users })
  })
})

app.get('/api/players', auth, invited, (req, res) => {
  database.getAllPlayers().then((response) => {
    let players = response.map(player => _.get(player, 'dataValues', {}))
    stats.getPlayerStats(players).then((playerStats) => {
      players = players.map((player, index) => ({ ...player, ...playerStats[index] }))
      res.send({ players })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.get('/api/remove-player', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    playerID,
  } = req.query
  database.removePlayer(playerID).then(() => {
    res.send({ message: 'Success' })
  }).catch(() => {
    res.send({ message: 'Error removing player from database' })
  })
})

app.get('/api/add-player', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    playerID,
  } = req.query
  database.addPlayer(playerID).then(() => {
    res.send({ message: 'Success' })
  }).catch(() => {
    res.send({ message: 'Error removing player from database' })
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
    const cookie = session.createUserCookie(accessToken, accessTokenSecret, userID)
    database.createUserIfDoesntExist(userID, accessToken, accessTokenSecret).then(() => {
      res.send({ cookieToStore: cookie })
    }).catch((error) => {
      res.status(500)
      res.send({ message: 'Error saving user to database', error })
    })
  }).catch((error) => {
    res.status(500)
    res.send({ message: 'Error getting access token', error })
  })
})

app.get('/api/add-user', auth, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const addUserPasscode = req.query.passcode
  if (addUserPasscode === ADD_USER_PASSCODE) {
    database.addUserToGame(req.profile.user).then(() => {
      res.send({ message: 'Success' })
    }).catch((error) => {
      res.status(500)
      res.send({ message: error })
    })
  } else {
    res.send({ message: 'Incorrect passcode' })
  }
})

app.get('/api/get-user', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    userID,
    tokenHash,
  } = session.decryptUserCookie(req.cookies)
  database.getUserFromID(userID).then((userData) => {
    if (userData) {
      const {
        accessToken,
        accessTokenSecret,
        isAdmin,
        isInvited,
      } = userData.dataValues
      if (session.checkUserVerification(tokenHash, accessToken, accessTokenSecret)) {
        twitter.getUserInfo(accessToken, accessTokenSecret).then((twitterUser) => {
          res.send({ ...twitterUser, isAdmin, isInvited })
        }).catch((error) => {
          res.status(500)
          res.send({ message: 'Error getting user', error })
        })
      } else {
        res.status(401)
        res.send({ message: 'Error authorizing user token cookie' })
      }
    } else {
      res.status(500)
      res.send({ message: 'Error getting user' })
    }
  })
})

if (NODE_ENV === 'development') {
  const port = 3001
  app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // eslint-disable-line no-console
}

module.exports.handler = serverless(app)
