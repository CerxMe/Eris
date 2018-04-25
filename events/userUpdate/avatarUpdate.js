const Discord = require('discord.js')

module.exports = async (client, oldUser, newUser) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': newUser.id})

  if (member !== null) {
    member.set('discord.avatarURL', newUser.displayAvatarURL)
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${newUser.tag}`, newUser.displayAvatarURL)
      .setColor(0xFAA61A)
      .setTimestamp()
      .setThumbnail(newUser.displayAvatarURL)
      .setDescription(`${newUser} just updated their avatar! Here's a link to the [new one](${newUser.displayAvatarURL}).`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
