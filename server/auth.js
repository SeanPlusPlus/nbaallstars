const _ = require('lodash')
const session = require('./util/session')
const database = require('./util/database')

const { NODE_ENV } = process.env

const auth = (req, res, next) => new Promise((resolve) => {
  const { userID, tokenHash } = session.decryptUserCookie(req.cookies)

  if (!userID) {
    res.status(401)
    res.send({
      message: 'Authentication Required',
    })
    resolve(null)
  } else { // we have an id
    database.getUserFromID(userID).then((response) => {
      const user = _.get(response, 'dataValues', null)
      if (!user) {
        res.status(401)
        res.send({
          message: 'Authentication Required',
        })
        resolve(null)
      } else {
        const { accessToken, accessTokenSecret } = user
        const authenticated = session.checkUserVerification(tokenHash, accessToken, accessTokenSecret)

        if (!authenticated) {
          res.status(401)
          res.send({
            message: 'Authentication Required',
          })
          resolve(null)
        } else {
          req.profile = {
            user,
          }
          resolve(next())
        }
      }
    })
  }
})

const admin = (req, res, next) => {
  if (NODE_ENV === 'development') {
    return next()
  }

  const isAdmin = _.get(req, 'profile.user.isAdmin', false)
  if (!isAdmin) {
    res.status(403)
    res.send({
      message: 'Access Denied',
    })
  } else {
    return next()
  }
}

const invited = (req, res, next) => {
  const isInvited = _.get(req, 'profile.user.isInvited', false)
  if (!isInvited) {
    res.status(403)
    res.send({
      message: 'Access Denied',
    })
  } else {
    return next()
  }
}

module.exports = { auth, admin, invited }
