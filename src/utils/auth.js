const rp = require('request-promise')
const cookie = require('./cookieUtil')

function redirectUserToTwitter(requestToken) {
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`
  window.location.href = url
}

function logInWithTwitter() {
  rp.get('http://localhost:3001/twitter/request-token').then((responseBody) => {
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
  const url = `http://localhost:3001/twitter/access-token?
               authToken=${authToken}
               &authTokenSecret=${authTokenSecret}
               &authVerifier=${authVerifier}`
  rp.get(url).then((responseBody) => {
    const response = JSON.parse(responseBody)
    cookie.setUserAccessTokenCookie(response.cookieToStore)
  }).catch(() => {
  })
}


export default {
  getUserTokens,
  logInWithTwitter,
}
