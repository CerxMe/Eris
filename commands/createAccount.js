const Discord = require('discord.js')

module.exports = {
  name: 'enroll',
  description: 'Create an Elkia account',
  async execute (message, args) {
    const MemberCollection = message.client.eris.models.Member

    let guildMember = message.member

    let member = await MemberCollection.findOne({'discord.id': guildMember.id})
    // Must not have an account already
    if (member === null) {
      member = new MemberCollection(
        {
          createdAt: new Date(),
          status: 'newbie',
          discord: {
            id: guildMember.id,
            name: guildMember.displayName,
            tag: guildMember.user.tag,
            joinedAt: guildMember.joinedAt,
            color: guildMember.displayHexColor,
            avatarURL: guildMember.user.displayAvatarURL
          }
        })
      await member.save()

      let logMessage = new Discord.RichEmbed()
          .setAuthor(`${guildMember.user.tag}`, guildMember.user.displayAvatarURL)
        .setColor(0x7473B3)
        .setDescription(`${guildMember.user} created an account!`)
          .addField(`Account ID`, member.get('_id'), true)
          .addField(`Discord ID`, member.get('discord.id'), true)
          .addField(`Guild joined`, member.get('discord.joinedAt'), true)
          .addField(`Account creation`, member.get('createdAt'), true)
          .addField(`Status`, member.get('status'), true)
          .addField(`Display Color`, member.get('discord.color'), true)

      message.channel.send(message.client.eris.getRandomMessage('createAccount', 'new'), logMessage)
    } else {
      // Existing members
      message.reply(message.client.eris.getRandomMessage('createAccount', 'existing'))
    }
  }

}
