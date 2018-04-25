const reqEvent = (event) => require(`./${event}`)

module.exports = client => {
  /*
   *  Register any new event hooks in here!
   */

  client.on('ready', () => reqEvent('ready')(client))

  client.on('message', message => reqEvent('message/message')(client, message))

  client.on('guildMemberAdd', member => reqEvent('guildMemberAdd')(client, member))
  client.on('guildMemberRemove', member => reqEvent('guildMemberRemove')(client, member))

  client.on('guildBanAdd', (guild, member) => reqEvent('guildBanAdd')(client, guild, member))
  client.on('guildBanRemove', (guild, member) => reqEvent('guildBanRemove')(client, guild, member))

  client.on('guildMemberUpdate', (oldMember, newMember) => reqEvent('guildMemberUpdate/')(client, oldMember, newMember))
  client.on('userUpdate', (oldMember, newMember) => reqEvent('userUpdate/')(client, oldMember, newMember))
}
