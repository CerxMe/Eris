const Discord = require('discord.js')

module.exports = {
  name: 'purge',
  description: 'Purge the lastest ## messages',
  aliases: [],
  async execute(message, args) {
    try {
      if (!args[0] || isNaN(args[0])) {
        const logMessage = new Discord.RichEmbed()
          .setColor(message.client.eris.config.responseColors.errorResponse)
          .setDescription("You forgot to tell me how many messages I should purge. For example, use ?purge 10 - I can purge as many as 99 messages at one time")
        message.channel.send(logMessage)
      } else {
        let messageCount = args[0]
        if (messageCount > 99) {
          const logMessage = new Discord.RichEmbed()
            .setColor(message.client.eris.config.responseColors.errorResponse)
            .setDescription("I can not purge " + messageCount + " messages. I can only purge 99 message at one time. For example, use ?purge 99")
          message.channel.send(logMessage)
        } else {
          message.channel.fetchMessages({
            limit: messageCount
          }).then(messages => message.channel.bulkDelete(messages))
        }
      }
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't purge messages")
        .setColor(message.client.eris.config.responseColors.errorResponse)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('general', 'error'), logMessage)
    }
  }
}
/* Author : Tommin */
/* Date : May 28 2018 */
