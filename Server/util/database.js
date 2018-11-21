const User = require('../../models/User')

function getUserFromID(userID) {
  return User.findOne({ where: { id: userID } })
}

function getAllUsers() {
  return User.findAll()
}

function updateOrCreate(id, accessToken, accessTokenSecret) {
  return User.upsert({
    id,
    accessToken,
    accessTokenSecret,
  })
}

module.exports = {
  getUserFromID,
  getAllUsers,
  updateOrCreate,
}
