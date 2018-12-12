import { getUserAccessTokenCookie } from './cookie'

const cookie = require('./cookie')
const request = require('./request')

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
  request.get(url).then((responseBody) => {
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
  return request.get(url).then((responseBody) => {
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
  const url = urlBuilder(serverUrl, '/twitter/get-user/')
  return request.get(url)
}

function logOut() {
  cookie.deleteUserAccessTokenCookie()
  window.location.reload()
}

function addUser(passcode) {
  const url = urlBuilder(serverUrl, '/api/add-user/?', { passcode })
  request.get(url).then((data) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })
}

export default {
  getUserTokens,
  logInWithTwitter,
  getUserInfoFromCookie,
  logOut,
  addUser,
}
