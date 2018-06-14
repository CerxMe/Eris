const Discord = require('discord.js')
const moment = require('moment')
let request, response
request = require('async-request')

module.exports = {
  name: 'playerstats',
  description: 'Gathers detailed stats about a player.',
  aliases: ['player','playerinfo','player-info'],
  async execute (message, args) {
    try {
    // Find out the MC UUID of the name input
      response = await request(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
      const {id, name} = JSON.parse(response.body)

   // Fetch player's username history
      response = await request(`https://api.mojang.com/user/profiles/${id}/names`)
      const namesJSON = JSON.parse(response.body)
      console.log(`Player info for ${name} has been requested.`)
      let names = new Array()
      for (var i in namesJSON) {
        if (!namesJSON[i].changedToAt){
          var changeDate = "Original IGN"
        } else {
          var timestamp = moment(namesJSON[i].changedToAt)
          var changeDate = timestamp.format("MMMM Do, YYYY")
        }
        // Store past usernames to the array
        names.push(`IGN: **${namesJSON[i].name}**` + "\n" + `${changeDate}\n`)
      }
      names.push(`\n`)

   // Output the stats
      let logMessage = new Discord.RichEmbed()
            .setTitle(`**${name}'s Player Info**`)
            .setURL(`https://namemc.com/${name}`)
            .setDescription(`Player info for UUID: ${id}`)
            .setFooter(`Skin Download: https://visage.surgeplay.com/skin/512/${name}.png`, `https://visage.surgeplay.com/face/512/${name}.png`)
            .setThumbnail(`https://visage.surgeplay.com/head/512/${name}.png`)
            .setImage(`https://visage.surgeplay.com/full/500/${name}.png`)
            .setColor(message.client.eris.config.responseColors.positiveResponse)
            .addField("__***Username History:***__", names, false)
            .addField("__***Player Skin:***__", "Image:", false)

      message.channel.send(message.client.eris.getRandomMessage('playerInfoCommand', 'okay'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle('Player info error:')
        .setColor(message.client.eris.config.responseColors.errorResponse)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('playerInfoCommand', 'error'), logMessage)
    }
  }
}
