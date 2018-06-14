const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Show all available commands',
  aliases: [],
  async execute(message, args) {
    try {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Help Section Will be Shown Here")
        .setColor(message.client.eris.config.responseColors.infoResponse)
      message.channel.send(message.client.eris.getRandomMessage('general', 'delivery'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't show help")
        .setColor(message.client.eris.config.responseColors.errorResponse)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('general', 'error'), logMessage)
    }
  }
}
/* Author : Tommin */
/* Date : May 28 2018 */
