const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'seed',
  description: 'Generates a command for head drops',
  aliases: ['serverSeed', 'preset'],
  execute (message, args) {
    let now = new Date()
    let release = moment(message.client.eris.config.seed.releaseDate)
    let when = moment.duration(release - now)

    let released = when.asMilliseconds() < 0

    let logMessage = new Discord.RichEmbed()
        .setTitle(':seedling: Elkia *Season III* World Seed')
        .setDescription(released ? `The seed was released *${when.humanize(true)}*.` : `The seed will be released *${when.humanize(true)}*.`)
        .setFooter(`Admin Consortium have decided to release the seed after several months into the season to encourage exploration and avoid ruining early game.`)
        .setColor(message.client.eris.config.responseColors.infoResponse)
    if (released) {
      let seed = message.client.eris.config.seed.value
      logMessage.addField(`\`${seed}\``, '\u200B')
    }

    message.channel.send(message.client.eris.getRandomMessage('seedCommand', 'delivery'), logMessage)
  }
}
