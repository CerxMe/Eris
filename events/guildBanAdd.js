/*
 * Emitted whenever someone gets banned
 */

const Discord = require('discord.js')

module.exports = async (client, guild, user) => {
  const MemberCollection = client.eris.models.Member

  // Update database entry
  let member = await MemberCollection.findOne({'discord.id': user.id})
  if (member !== null) {
    member.set('status', 'banned')
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${user.tag}`, user.displayAvatarURL)
      .setColor(0x000)
      .setTimestamp()
      .setDescription(`The Ban hammer has spoken! ${user.displayName} is now banned.`)
      .addField('Discord ID', user.id)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
