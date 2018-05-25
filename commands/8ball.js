const Discord = require('discord.js')

module.exports = {
  name: '8ball',
  description: 'Ask a question, Get an answer',
  aliases: ['ask','q'],
  async execute (message, args) {
    try{
      if (!args[0]) {
          const logMessage = new Discord.RichEmbed()
              .setColor(0x00e6e6)
              .setDescription("You forgot to ask your question.. Try again with ?8ball [question]")
          message.channel.send(logMessage);
      } else {
        let AnswerMessage = message.client.eris.getRandomMessage('8ballCommand', 'okay')
        let logMessage = new Discord.RichEmbed()
              .setTitle("8Ball Response")
              .setColor(0x00AAAA)
              .setDescription(AnswerMessage)

              message.channel.send(logMessage);
      }
    }catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't Answer Question")
        .setColor(0xAA00AA)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('8ballCommand', 'error'), logMessage)
    }
  }
}
