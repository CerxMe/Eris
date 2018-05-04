
const Discord = require('discord.js')

module.exports = {
  name: 'link',
  description: 'link a minecraft account with Discord',
  async execute (message, args) {
    const MemberCollection = message.client.eris.models.Member

    let member = await MemberCollection.findOne({'discord.id': message.member.id})
    if (member === null) {
      message.reply(`You're missing a database record, please **!enroll** first.`)
    } else {
      message.reply(`TBD`)
    }
  }

}
