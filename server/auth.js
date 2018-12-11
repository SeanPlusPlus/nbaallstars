const _ = require('lodash')
const session = require('./util/session')
const database = require('./util/database')

const { NODE_ENV } = process.env

const auth = (req, res, next) => new Promise((resolve) => {
  const cookie = _.get(req, 'headers.cookie', '').split('=')[1]
  const { userID, tokenHash } = session.decryptUserCookie(cookie)

  console.log(userID)


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
          // TODO !!!
          const isAdmin = user.isAdmin || false

          req.profile = {
            id: user.id,
            isAdmin,
          }
          resolve(next())
        }
      }
    })
  }
})

const isAdmin = (req, res, next) => {
  const admin = _.get(req, 'profile.isAdmin', false)
  if (!admin) {
    res.status(403)
    res.send({
      message: 'Access Denied',
    })
  } else {
    return next()
  }
}

module.exports = { auth, isAdmin }
