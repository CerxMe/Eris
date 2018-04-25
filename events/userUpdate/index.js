/*
 * Emitted whenever a something changes about users
 */

module.exports = async (client, oldUser, newUser) => {
  // new color (roles changed)

  if (oldUser.displayAvatarURL !== newUser.displayAvatarURL) {
    require('./avatarUpdate')(client, oldUser, newUser)
  }

  if (oldUser.tag !== newUser.tag) {
    require('./tagUpdate')(client, oldUser, newUser)
  }
}
