import { setGlobal } from 'reactn'
import { getUserAccessTokenCookie } from './cookie'

const cookie = require('./cookie')
const request = require('./request')

// Temporary. Need to go in .env?
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
  const url = '/twitter/request-token'
  request.get(url)
    .then((response) => {
      const {
        requestToken,
        requestTokenSecret,
      } = response.requestTokens
      cookie.setRequestTokenSecretCookie(requestTokenSecret)
      redirectUserToTwitter(requestToken)
    }).catch(() => {
    })
}

function getUserInfoFromCookie() {
  const userCookie = getUserAccessTokenCookie()
  if (!userCookie) {
    return Promise.reject()
  }
  const url = '/api/get-user/'
  return request.get(url)
}

function getUserTokens(authToken, authVerifier) {
  const authTokenSecret = cookie.getRequestTokenSecretCookie()
  cookie.deleteRequestTokenSecretCookie()
  const url = urlBuilder(
    '',
    '/twitter/access-token?',
    {
      authToken,
      authTokenSecret,
      authVerifier,
    },
  )
  return request.get(url).then((response) => {
    cookie.setUserAccessTokenCookie(response.cookieToStore)
    getUserInfoFromCookie().then((twitterUserData) => {
      setGlobal({ user: twitterUserData })
    }).catch(() => {})
  }).catch(() => {
  })
}

function logOut() {
  cookie.deleteUserAccessTokenCookie()
  window.location.reload()
}

function addUser(passcode) {
  const url = urlBuilder('', '/api/add-user/?', { passcode })
  return request.get(url)
}

export default {
  getUserTokens,
  logInWithTwitter,
  getUserInfoFromCookie,
  logOut,
  addUser,
}
