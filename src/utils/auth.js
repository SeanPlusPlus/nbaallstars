const rp = require('request-promise')
function logInWithTwitter() {
  rp.get('http://localhost:3001/twitter/request-token').then((response) => {
    response = JSON.parse(response)
    redirectUserToTwitter(response.token)
  }).catch((error) => {
    console.log(error)
  })
}

function redirectUserToTwitter(token) {
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`
  //window.location.href = url
}

function getUserTokens(authToken, authVerifier) {
  rp.get('http://localhost:3001/twitter/access-token').then((response) => {
    response = JSON.parse(response)
    console.log(response)
  })
}

exports.getUserTokens = getUserTokens
exports.logInWithTwitter = logInWithTwitter