const Discord = require('discord.js')
const moment = require('moment')
let request, response
request = require('async-request')

module.exports = {
  name: 'serverstatus',
  description: 'Fetches server status',
  aliases: ['server','serverstatus',],
  async execute (message, args) {
    try {
      // Store which server to find the status of
      let outputName = "Main Server Status"
      let serverip = "elkia.life"
      let outputIcon = "https://i.imgur.com/M26k7kA.png"
      if (args[0] == "penguin") {
        serverip = "penguin.elkia.life"
        outputIcon = "https://i.imgur.com/i99HmIl.png"
        outputName = "Penguin Server Status"
      }

      // Find server Status
      response = await request(`https://mcapi.us/server/status?ip=${serverip}`)
      const {online, players, server, last_updated} = JSON.parse(response.body)
      let outputOnline, outputLastOnline
      if (online) {
        outputOnline = ":white_check_mark: Online"
      } else {
        outputOnline = ":x: Offline"
      }

      // Output
      let logMessage = new Discord.RichEmbed()
        .setTitle(outputName)
        .setThumbnail(outputIcon)
        .setColor(0x00AAAA)
        .setDescription(`Status: ${outputOnline}\nPlayers: ${players.now} / ${players.max}\nVersion: ${server.name}`)
        .setFooter(`Last Checked: ${moment(Number(last_updated) * 1000).startOf('second').fromNow()}`)

      message.channel.send(message.client.eris.getRandomMessage('serverStatusCommand', online), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle('Server Status Error:')
        .setColor(0xAA00AA)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('serverStatusCommand', 'error'), logMessage)
    }
  }
}
