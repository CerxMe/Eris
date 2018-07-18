let request, response
request = require('async-request')
const Discord = require('discord.js')
module.exports = {
  name: 'approvelink',
  description: 'For use to perform Admin approval of a link request',
  async execute (message, args) {
    const client = message.client
    let member, ign, adminlink
    // Admin linking
    if (message.member.hasPermission('ADMINISTRATOR')) {
      // TODO: Approve link
    }
    else {
      let logMessage = new Discord.RichEmbed()
        .setTitle(`Link request approval failed!`)
        .setDescription(`You don't have AMINISTRATOR permissions and therefore cannot approve a link reqest.`)
        .setColor(0xAF364C)
        .setTimestamp()
      message.channel.send('', logMessage)
    }
  }
}
