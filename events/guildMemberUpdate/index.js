/*
 * Emitted whenever a something changes about users
 */

module.exports = async (client, oldMember, newMember) => {
  // new color (roles changed)
  if (oldMember.displayHexColor !== newMember.displayHexColor) {
    require('./displayColorUpdate')(client, newMember)
  }

  if (oldMember.displayName !== newMember.displayName) {
    require('./displayNameUpdate')(client, oldMember, newMember)
  }
}
