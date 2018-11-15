const OAuth = require('oauth')

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'jJ8BvM2ZVzhy4D0Dj1cOffK8l',
  'mMuoWNpjUx4Dp1pTSFsODWd352lKDzbJetW9ZdI1WCsjYpFNPc',
  '1.0A',
  null,
  'HMAC-SHA1'
)

function logInWithTwitter() {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken({ oauth_callback: 'http://localhost:3000/login' }, function (error, requestToken, requestTokenSecret, parsedQueryString) {
      if (error) {
        console.log(error)
        reject(new Error(error))
      } else {
        resolve({ requestToken, requestTokenSecret })
      }
    })
  })
}

function getAccessToken(authToken, authTokenSecret, authVerifier) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(authToken, authTokenSecret, authVerifier, (error, accessToken, accessTokenSecret, queryString) => {
      if (error) {
        console.log('Error', error)
        reject(new Error(error))
      } else {
        console.log(accessToken)
        console.log(accessTokenSecret)
        console.log(queryString)
        resolve({
          accessToken,
          accessTokenSecret,
          userID: queryString.user_id,
        })
      }
    })
  })
}

function getUserInfo(userAccessToken, userAccessTokenSecret) {
  oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json', userAccessToken, userAccessTokenSecret, (response) => {
    console.log(response)
  })
}

export {
  logInWithTwitter,
  getAccessToken,
  getUserInfo,
}