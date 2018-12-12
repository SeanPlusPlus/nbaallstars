const rp = require('request-promise').defaults({ jar: true })
const cookie = require('./cookie')

function get(url) {
  // eslint-disable-next-line no-unused-vars
  const userCookie = cookie.getUserAccessTokenCookie()
  // need to add cookie to request
  return rp.get(url)
}

module.exports = {
  get,
}
