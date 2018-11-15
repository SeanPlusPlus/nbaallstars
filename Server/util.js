const crypto = require('crypto')

function createTokenHash(token, tokenSecret) {
  let hash = crypto.createHash('sha256')
  hash.update(token)
  hash.update(tokenSecret)
  return hash.digest('hex')
}

export {
  createTokenHash
}