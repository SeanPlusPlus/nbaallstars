const OAuth = require('oauth')

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'jJ8BvM2ZVzhy4D0Dj1cOffK8l',
  'mMuoWNpjUx4Dp1pTSFsODWd352lKDzbJetW9ZdI1WCsjYpFNPc',
  '1.0A',
  null,
  'HMAC-SHA1',
)

function getRequestToken() {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken(
      { oauth_callback: 'http://localhost:3000/login' },
      (error, requestToken, requestTokenSecret) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve({ requestToken, requestTokenSecret })
        }
      },
    )
  })
}

function getAccessToken(authToken, authTokenSecret, authVerifier) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(
      authToken,
      authTokenSecret,
      authVerifier,
      (error, accessToken, accessTokenSecret, queryString) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve({
            accessToken,
            accessTokenSecret,
            userID: queryString.user_id,
          })
        }
      },
    )
  })
}

function getUserInfo(userAccessToken, userAccessTokenSecret) {
  oauth.get(
    'https://api.twitter.com/1.1/account/verify_credentials.json',
    userAccessToken,
    userAccessTokenSecret,
    (response) => {
    // eslint-disable-next-line no-console
      console.log(response)
    },
  )
}

module.exports = {
  getRequestToken,
  getAccessToken,
  getUserInfo,
}
