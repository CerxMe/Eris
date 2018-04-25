/*
 * Emitted whenever a user joins a guild.
 * - member = GuildMember (https://discord.js.org/#/docs/main/stable/class/GuildMember)
 */

const Discord = require('discord.js')
const moment = require('moment')

module.exports = async (client, guildMember) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': guildMember.id})

  if (member === null) {
    // New Member

    member = new MemberCollection(
      {
        status: 'newbie',
        discord: {
          id: guildMember.id,
          name: guildMember.displayName,
          joinedAt: guildMember.joinedAt,
          color: guildMember.displayHexColor,
          avatarURL: guildMember.user.displayAvatarURL
        }
      })
  } else {
    // Old friends coming home

    member.set('status', 'rejoined')
    member.set('discord.lastJoinedAt', new Date())
  }

  await member.save()

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${guildMember.user.tag}`, guildMember.user.displayAvatarURL)
      .setColor(0x43B581)
      .setTimestamp()
      .setDescription(member === null ? `${guildMember.user} just joined the guild! Go say hi to them in #new-guys!` : member.get('discord.abbandonedAt') === null ? `${guildMember.user} just **came back**! Give them a warm greetings in #new-guys!` : ` ${guildMember.user} just came back after **${moment.duration(member.get('discord.abbandonedAt') - new Date()).humanize()}**! Give them a warm greetings in #new-guys!`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
