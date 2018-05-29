const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Show all available commands',
  aliases: [],
  async execute(message, args) {
    try {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Help Section Will be Shown Here")
        .setColor(0xAA00AA)
      message.channel.send(message.client.eris.getRandomMessage('general', 'delivery'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't show help")
        .setColor(0xAA00AA)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('general', 'error'), logMessage)
    }
  }
}
/* Author : Tommin */
/* Date : May 28 2018 */
