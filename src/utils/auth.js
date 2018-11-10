const OAuth = require('oauth')
const oauth = new OAuth.OAuth(
  'http://cors.io/?https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'jJ8BvM2ZVzhy4D0Dj1cOffK8l',
  'mMuoWNpjUx4Dp1pTSFsODWd352lKDzbJetW9ZdI1WCsjYpFNPc',
  '1.0A',
  null,
  'HMAC-SHA1'
)

function logInWithTwitter() {
  oauth.getOAuthRequestToken({ oauth_callback: 'http://localhost:3000' }, function (error, token, tokenSecret, parsedQueryString) {
    if (error) {
      console.log(error)
    } else {
      console.log(token)
      console.log(tokenSecret)
      console.log(parsedQueryString)
      redirectUserToTwitter(token)
    }
  })
}

function redirectUserToTwitter(token) {
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`
  window.location.href = url
}


exports.logInWithTwitter = logInWithTwitter