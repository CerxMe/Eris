/*
 * Message logger & counter
 */

const moment = require('moment')

module.exports = async (message) => {

  //TODO: this was used for used for debug, delete following line
  console.log(`<${message.member.id}>: ${message.content}`)

  const MemberCollection = message.client.eris.models.Member

  // Find a database entry for the member
  let member = await MemberCollection.findOne({'discord.id': message.author.id})

  // Member needs to have a record in the database, message gets ignored othervise
  if (member !== null) {
    let totalMessages = member.get('discord.messages.total') === null || isNaN(member.get('discord.messages.total')) ? 1 : member.get('discord.messages.total') + 1

    // Message activity by day and time of the day
    let activetime = message.client.eris.getActiveTime(message.createdAt)
    member.set(`discord.messages.${activetime}`, member.get(`discord.messages.${activetime}`) === undefined ? 1 : member.get(`discord.messages.${activetime}`) + 1)

    // Other information
    member.set('discord.messages', {
      total: totalMessages,
      lastMessage: {
        createdAt: message.createdAt,
        channel: {
          id: message.channel.id,
          name: message.channel.name
        },
        content: message.content
      }
    })

    // Save the database entry
    await member.save()
  }
}
