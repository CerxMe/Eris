const Discord = require('discord.js')

module.exports = async (client, oldUser, newUser) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': newUser.id})

  if (member !== null) {
    member.set('discord.tag', newUser.tag)
    await member.save()
  }

  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${oldUser.tag}`, newUser.displayAvatarURL)
      .setColor(0xFAA61A)
      .setTimestamp()
      .setDescription(`${newUser} just updated their discord tag. Let them be know as **${newUser.tag}** from now on.`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
