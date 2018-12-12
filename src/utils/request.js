const cookie = require('./cookie')

function get(url) {
  // eslint-disable-next-line no-unused-vars
  const userCookie = cookie.getUserAccessTokenCookie()
  // need to add cookie to request
  return fetch(url, { credentials: 'include' })
}

module.exports = {
  get,
}
