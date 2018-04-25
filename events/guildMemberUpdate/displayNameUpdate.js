const Discord = require('discord.js')

module.exports = async (client, oldMember, newMember) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': newMember.id})

  if (member !== null) {
    member.set('discord.name', newMember.displayName)
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${newMember.user.tag}`, newMember.user.displayAvatarURL)
      .setColor(0xFAA61A)
      .setTimestamp()
      .setDescription(`**${oldMember.displayName}** just updated their name to **${newMember.displayName}**.`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
