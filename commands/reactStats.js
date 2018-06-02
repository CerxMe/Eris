const Discord = require('discord.js')
let request, response
request = require('async-request')
const moment = require('moment')

module.exports = {
  name: 'reactstats',
  description: 'Displays reaction stats',
  aliases: ['reactstats', 'reacts', 'react-stats', 'r'],
  async execute(message, args) {
    try {
      // Setup

      const StatsCollection = message.client.eris.models.ReactionStats
      const allReactions = await StatsCollection.sort({
        totalUses: -1
      }).find()
      let outputReact = new Array()
      for (let reaction of allReactions) {
        let reacts = reaction.get()

        // Loop though triggers for each reaction.
        //console.log(reacts.triggers)
        let allTriggers = reacts.triggers
        let timeUsed = 0
        let timeUsedMostRecent = 0

        function walk(allTriggers) {
          for (var key in allTriggers) {
            if (allTriggers.hasOwnProperty(key)) {
              let val = allTriggers[key];
              timeUsed = moment(val["lastMessage"]["createdAt"])
              if (timeUsedMostRecent == 0) {
                timeUsedMostRecent = timeUsed
              } else {
                if (timeUsed > timeUsedMostRecent) {
                  timeUsedMostRecent = timeUsed
                }
              }
            }
          }
        }
        walk(allTriggers);

        outputReact.push(`Reaction: :${reacts.reaction}:   Uses: ${reacts.totalUses}\nLast Used: ${timeUsedMostRecent.format("LLLL")}\n\n`)
      }

      // Output
      let logMessage = new Discord.RichEmbed()
        .setTitle('Reaction Stats')
        .setColor(0x00AAAA)
        .setDescription(outputReact)

      message.channel.send(message.client.eris.getRandomMessage('general', 'delivery'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle('React Stats Error:')
        .setColor(0xAA00AA)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('serverStatusCommand', 'error'), logMessage)
    }
  }
}
