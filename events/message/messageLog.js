/*
 * Message logger & counter
 */

module.exports = async (client, message) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': message.author.id})

  // Member needs to have a record in the database
  if (member !== null) {
    let totalMessages = member.get('discord.messages.total') === null ? 1 : member.get('discord.messages.total') + 1

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

    await member.save()
  }
}
