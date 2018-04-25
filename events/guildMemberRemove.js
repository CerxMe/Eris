/*
 * Emitted whenever a user leaves the guild.
 */

const Discord = require('discord.js')

module.exports = async (client, guildMember) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': guildMember.id})
  if (member !== null) {
    member.set('status', 'abbandoned')
    member.set('discord.abbandonedAt', new Date())
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${guildMember.user.tag}`, guildMember.user.displayAvatarURL)
      .setColor(0xF04747)
      .setTimestamp()
      .setDescription(`${guildMember.user} left the guild! Farewell.`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
