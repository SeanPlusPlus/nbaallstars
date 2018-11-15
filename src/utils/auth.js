const rp = require('request-promise')
const cookie = require('./cookieUtil')

function logInWithTwitter() {
  rp.get('http://localhost:3001/twitter/request-token').then((response) => {
    response = JSON.parse(response)
    const {
      requestToken,
      requestTokenSecret,
    } = response.requestTokens
    cookie.setRequestTokenSecretCookie(requestTokenSecret)
    redirectUserToTwitter(requestToken)
  }).catch((error) => {
    console.log(error)
  })
}

function redirectUserToTwitter(requestToken) {
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`
  window.location.href = url
}

export function getUserTokens(authToken, authVerifier) {
  const authTokenSecret = cookie.getRequestTokenSecretCookie()
  cookie.deleteRequestTokenSecretCookie()
  const url = `http://localhost:3001/twitter/access-token?authToken=${authToken}&authTokenSecret=${authTokenSecret}&authVerifier=${authVerifier}`
  rp.get(url).then((response) => {
    response = JSON.parse(response)
    cookie.setUserAccessTokenCookie(response.cookieToStore)
  }).catch((error) => {
    console.log('User Token Error', error)
  })
}


export default {
  getUserTokens,
  logInWithTwitter,
}