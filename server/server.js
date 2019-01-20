const serverless = require('serverless-http')
const express = require('express')
const dotenv = require('dotenv')
const _ = require('lodash')
const cookieParser = require('cookie-parser')
const database = require('./util/database')
const twitter = require('./util/twitter')
const session = require('./util/session')
const stats = require('./util/stats')
const sanitizer = require('./util/sanitizer')
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
    const users = response.map(r => _.get(r, 'dataValues', {})).map(user => sanitizer.getUser(user))
    res.send({ users })
  })
})

app.get('/api/years', auth, admin, (req, res) => {
  database.getAllYears().then((years) => {
    res.send({ years })
  })
})

app.get('/api/allstars/:year', auth, invited, (req, res) => {
  const { year } = req.params
  database.getAllstarsForYear(year).then((response) => {
    let players = response.map(player => _.get(player, 'dataValues.player.dataValues', {}))
    stats.getPlayerStats(players).then((playerStats) => {
      players = players.map((player, index) => (
        sanitizer.getPlayer({ ...player, ...playerStats[index] })))
      res.send({ players })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.delete('/api/allstars/:year/:id', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    id,
    year,
  } = req.params
  database.removeAllstar(id, year).then(() => {
    res.send({ message: 'Success' })
  }).catch(() => {
    res.send({ message: 'Error removing player from database' })
  })
})

app.post('/api/allstars/:year/:ids', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    ids,
    year,
  } = req.params
  database.addAllstars(ids.split(','), year).then(() => {
    res.send({ message: 'Success' })
  }).catch(() => {
    res.send({ message: 'Error removing player from database' })
  })
})

app.get('/api/captains/:year', auth, invited, (req, res) => {
  const { year } = req.params
  database.getCaptainsForYear(year).then((response) => {
    let players = response.map(player => ({
      ..._.get(player, 'dataValues.player.dataValues', {}),
      conference: player.conference,
    }))
    stats.getPlayerStats(players).then((playerStats) => {
      players = players.map((player, index) => (
        sanitizer.getCaptain({ ...player, ...playerStats[index] })))
      res.send({ players })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.get('/api/captains', auth, admin, (req, res) => {
  database.getCaptains().then((players) => {
    stats.getPlayerStats(players).then((playerStats) => {
      const output = players.map((player, index) => (
        sanitizer.getCaptain({ ...player, ...playerStats[index] })))
      res.send({ players: output })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.get('/api/players', auth, invited, (req, res) => {
  database.getAllPlayers().then((response) => {
    let players = response.map(player => _.get(player, 'dataValues', {}))
    stats.getPlayerStats(players).then((playerStats) => {
      players = players.map((player, index) => (
        sanitizer.getPlayer({ ...player, ...playerStats[index] })))
      res.send({ players })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.get('/api/non-allstars/:year', auth, admin, (req, res) => {
  const { year } = req.params
  database.getPlayersThatArentAllstars(year).then((players) => {
    stats.getPlayerStats(players).then((playerStats) => {
      const results = players.map((player, index) => (
        sanitizer.getPlayer({ ...player, ...playerStats[index] })))
      res.send({ players: results })
    }).catch(() => {
      res.send({ players })
    })
  })
})

app.delete('/api/player/:id', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    id,
  } = req.params
  database.removePlayer(id).then(() => {
    res.send({ message: 'Success' })
  }).catch(() => {
    res.send({ message: 'Error removing player from database' })
  })
})

app.post('/api/player/:id', auth, admin, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const {
    id,
  } = req.params
  database.addPlayer(id).then(() => {
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

app.post('/api/user/:passcode', auth, (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  const { passcode } = req.params
  if (passcode === ADD_USER_PASSCODE) {
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

app.get('/api/user', (req, res) => {
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
          const user = sanitizer.getUser({
            ...twitterUser,
            photoURL: twitterUser.profile_image_url,
            twitterID: twitterUser.id,
            isAdmin,
            isInvited,
          })
          res.send(user)
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

if (NODE_ENV === 'test') {
  module.exports = app
}

module.exports.handler = serverless(app)
