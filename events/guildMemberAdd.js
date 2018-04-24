/*
 * Emitted whenever a user joins a guild.
 * - member = GuildMember (https://discord.js.org/#/docs/main/stable/class/GuildMember)
 */

const Discord = require('discord.js')

module.exports = async (client, guildMember) => {
  const MemberCollection = client.eris.models.Member

  // Search parameters
  let discord = {
    id: guildMember.id
  }

  // Database lookup
  let member = await MemberCollection.findOne({discord})

  const newStatus = member === null
  member = newStatus ? new MemberCollection(
    {
      status: 'newbie',
      discord: {
        id: guildMember.id,
        name: guildMember.displayName,
        joinedAt: guildMember.joinedAt,
        color: guildMember.displayHexColor,
        avatarURL: guildMember.user.displayAvatarURL
      }
    }) : member

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${guildMember.user.tag}`, guildMember.user.displayAvatarURL)
      .setColor(0x43B581)
      .setTimestamp()
      .setDescription(newStatus ? `Just joined the Guild! Go say hi to them in #new-guys!` : `Just came back from a vacation! Give them a warm greetings in #new-guys!`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)

  // Save changes
  await member.save()

  console.log(member.get('discord'))
}
