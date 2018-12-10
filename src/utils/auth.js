import { getUserAccessTokenCookie } from './cookie'

const rp = require('request-promise')
const cookie = require('./cookie')

// Temporary. Need to go in .env?
const serverUrl = 'http://localhost:3001'
const twitterApiUrl = 'https://api.twitter.com'

function urlBuilder(base, resource, querys) {
  let params = ''
  if (querys) {
    params = Object.keys(querys).map(k => (`${k}=${querys[k]}`)).join('&')
  }
  return base + resource + params
}

function redirectUserToTwitter(oauth_token) {
  const url = urlBuilder(twitterApiUrl, '/oauth/authenticate?', { oauth_token })
  window.location.href = url
}

function logInWithTwitter() {
  const url = urlBuilder(serverUrl, '/twitter/request-token')
  rp.get(url).then((responseBody) => {
    const response = JSON.parse(responseBody)
    const {
      requestToken,
      requestTokenSecret,
    } = response.requestTokens
    cookie.setRequestTokenSecretCookie(requestTokenSecret)
    redirectUserToTwitter(requestToken)
  }).catch(() => {
  })
}

function getUserTokens(authToken, authVerifier) {
  const authTokenSecret = cookie.getRequestTokenSecretCookie()
  cookie.deleteRequestTokenSecretCookie()
  const url = urlBuilder(
    serverUrl,
    '/twitter/access-token?',
    {
      authToken,
      authTokenSecret,
      authVerifier,
    },
  )
  return rp.get(url).then((responseBody) => {
    const response = JSON.parse(responseBody)
    cookie.setUserAccessTokenCookie(response.cookieToStore)
  }).catch(() => {
  })
}

function getUserInfoFromCookie() {
  const userCookie = getUserAccessTokenCookie()
  if (!userCookie) {
    return Promise.reject()
  }
  const url = urlBuilder(serverUrl, '/twitter/get-user/?', { userCookie })
  return rp.get(url)
}

function logOut() {
  cookie.deleteUserAccessTokenCookie()
  window.location.reload()
}

export default {
  getUserTokens,
  logInWithTwitter,
  getUserInfoFromCookie,
  logOut,
}
