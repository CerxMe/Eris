const reqEvent = (event) => require(`./${event}`)

module.exports = client => {
  /*
   *  Register any new event hooks in here!
   */

  // ready.js
  client.on('ready', () => reqEvent('ready')(client))

  // message.js
  client.on('message', message => reqEvent('message/message')(client, message))

  // guildMemberAdd.js
  client.on('guildMemberAdd', member => reqEvent('guildMemberAdd')(client, member))
  client.on('guildBanAdd', (guild, member) => reqEvent('guildBanAdd')(client, guild, member))
}
