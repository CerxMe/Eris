const Discord = require('discord.js')
let request, response
request = require('async-request')

module.exports = {
  name: 'reactstats',
  description: 'Displays reaction stats',
  aliases: ['reactstats','reacts','react-stats'],
  async execute (message, args) {
    try {
      // Setup
      const StatsCollection = message.client.eris.models.ReactionStats
      const allReactions = await StatsCollection.find()
      let outputReact = new Array()
      for (let reaction of allReactions) {
        let reacts = reaction.get()
        outputReact.push(`Reaction: :${reacts.reaction}:\nUses: ${reacts.totalUses}\n`)
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
