const Discord = require('discord.js')
let request, response
request = require('async-request')

module.exports = {
  name: 'mojangStatus',
  description: 'Generates a command for head drops',
  aliases: ['mojang', 'minecraftStatus'],
  async execute (message, args) {
    const colors = {'green': '0x55ACEE', 'yellow': '0x292F33', 'red': '0xDD2E44'}
    function colorToEmoji (color) {
      switch (color) {
        case 'green':
          return ':large_blue_circle:'
        case 'yellow':
          return ':black_circle:'
        case 'red':
          return ':red_circle:'
        default:
          return ':white_circle:'
      }
    }

    try {
      // Find out the MC UUID of the name input
      response = await request('https://status.mojang.com/check')
      const status = JSON.parse(response.body)

      let logMessage = new Discord.RichEmbed()
          .setTitle('Mojang Service status')
          .setTimestamp()

      let summary = 'green'
      status.forEach((status) => {
        if ((summary === 'green' && status === 'yellow') || status === 'red') { summary = status }
        let service = Object.keys(status)

        logMessage.addField(`${colorToEmoji(status[service[0]])} ${service[0]}`, '\u200B', true)
      })

      logMessage
          .setColor(colors[summary])
          .setDescription(message.client.eris.getRandomMessage('mojangStatusCommand', summary))

      message.channel.send(message.client.eris.getRandomMessage('general', 'delivery'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
          .setTitle('Service status is currently unavailable')
          .setColor(0xAA00AA)
          .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('mojangStatusCommand', 'error'), logMessage)
    }
  }
}
