const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'spawn',
  description: 'Show server spawn coordinates',
  aliases: [],
  execute (message, args) {

    let logMessage = new Discord.RichEmbed()
        .setTitle(':seedling: Elkia *Season III* World Spawn')
        .setDescription("Head yourself right towards 0,0")
        .setColor(message.client.eris.config.responseColors.infoResponse)
    message.channel.send(message.client.eris.getRandomMessage('seedCommand', 'delivery'), logMessage)
  }
}
