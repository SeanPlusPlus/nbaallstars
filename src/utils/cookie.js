const requestTokenSecretKey = 'requestTokenSecretKey'
const userAccessToken = 'nbaallstars'

function setRequestTokenSecretCookie(requestTokenSecret) {
  document.cookie = `${requestTokenSecretKey}=${requestTokenSecret}`
}

function setUserAccessTokenCookie(accessToken) {
  document.cookie = `${userAccessToken}=${accessToken}`
}

function deleteRequestTokenSecretCookie() {
  document.cookie = `${requestTokenSecretKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function deleteUserAccessTokenCookie() {
  document.cookie = `${userAccessToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

function getRequestTokenSecretCookie() {
  return getCookie(requestTokenSecretKey)
}

function getUserAccessTokenCookie() {
  return getCookie(userAccessToken)
}

export {
  setRequestTokenSecretCookie,
  setUserAccessTokenCookie,
  deleteRequestTokenSecretCookie,
  getRequestTokenSecretCookie,
  getUserAccessTokenCookie,
  deleteUserAccessTokenCookie,
}
