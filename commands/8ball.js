const Discord = require('discord.js')

module.exports = {
  name: '8ball',
  description: 'Ask a question, Get an answer',
  aliases: ['ask','q'],
  async execute (message, args) {
    try{
      if (!args[0]) {
          const logMessage = new Discord.RichEmbed()
              .setColor(message.client.eris.config.responseColors.errorResponse)
              .setDescription("You forgot to ask your question.. Try again with ?8ball [question]")
          message.channel.send(logMessage);
      } else {
        let AnswerMessage = message.client.eris.getRandomMessage('8ballCommand', 'okay')
        let logMessage = new Discord.RichEmbed()
              .setTitle("8Ball Response")
              .setColor(message.client.eris.config.responseColors.positiveResponse)
              .setDescription(AnswerMessage)

              message.channel.send(logMessage);
      }
    }catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't Answer Question")
        .setColor(message.client.eris.config.responseColors.errorResponse)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('8ballCommand', 'error'), logMessage)
    }
  }
}
/* Author : Tommin */
/* Date : May 25 2018 */
