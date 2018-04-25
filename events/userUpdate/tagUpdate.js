const Discord = require('discord.js')

module.exports = async (client, oldUser, newUser) => {
  let logMessage = new Discord.RichEmbed()
      .setAuthor(`${oldUser.tag}`, newUser.displayAvatarURL)
      .setColor(0xFAA61A)
      .setTimestamp()
      .setDescription(`${newUser} just updated their discord tag. Let them be know as **${newUser.tag}** from now on.`)

  client.channels.get(client.eris.config.guild.channels.logs).send('', logMessage)
}
