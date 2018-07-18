const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'spawn',
  description: 'Show server spawn coordinates',
  aliases: [],
  execute (message, args) {

    let logMessage = new Discord.RichEmbed()
      .setTitle(':map:  The spawn Island')
      .setDescription(message.client.eris.getRandomMessage('spawnCommand', 'description'))
      .setFooter('Rough spawn town location - x: 250, z: 500')
      .setColor(0x55ACEE)
    message.channel.send(message.client.eris.getRandomMessage('spawnCommand', 'message'), logMessage)
  }
}
