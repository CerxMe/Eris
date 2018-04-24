/*
 * Emitted whenever someone gets banned
 */

const Discord = require('discord.js')

module.exports = async (client, guild, user) => {
  const MemberCollection = client.eris.models.Member

  // Update database entry
  let member = await MemberCollection.findOne({'discord.id': user.id})
  if (member !== null) {
    member.set('status', 'unbanned')
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${user.tag}`, user.displayAvatarURL)
      .setColor(0xFFF)
      .setTimestamp()
      .setDescription(`The Ban hammer regrets it's actions. ${user.displayName} got un banned.`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
