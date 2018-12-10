const crypto = require('crypto')

function createTokenHash(token, tokenSecret) {
  const hash = crypto.createHash('sha256')
  hash.update(token)
  hash.update(tokenSecret)
  return hash.digest('hex')
}

function createUserCookie(accessToken, accessTokenSecret, userID) {
  const tokenHash = createTokenHash(accessToken, accessTokenSecret)
  return `${userID}:${tokenHash}`
}

function decryptUserCookie(userCookie) {
  const userIDandHash = userCookie.split(':')
  return {
    userID: userIDandHash[0],
    tokenHash: userIDandHash[1],
  }
}

function checkUserVerification(tokenHash, accessToken, accessTokenSecret) {
  return (tokenHash === createTokenHash(accessToken, accessTokenSecret))
}

module.exports = {
  createUserCookie,
  decryptUserCookie,
  checkUserVerification,
}
