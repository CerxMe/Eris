let request, response
request = require('async-request')
const Discord = require('discord.js')
module.exports = {
  name: 'link',
  description: 'link a minecraft account with Discord',
  async execute (message, args) {
    const client = message.client
    let member, ign, adminlink

    // Admin linking
    if (message.member.hasPermission('ADMINISTRATOR') && message.mentions.users.size > 0) {
      adminlink = true
      member = await client.eris.getMember(args[0])
      ign = args[1]
    }
    // Normal link
    else {
      adminlink = false
      member = await client.eris.getMember(message.member)
      ign = args[0]
    }

    // No database entry for member
    if (member === null) {
      let logMessage = new Discord.RichEmbed()
        .setTitle(`Link request failed!`)
        // If it's admin linking somebody else, display custom message.
        .setDescription(`${adminlink ? `*${args[0]}* is not a valid identifier or the member didn't !enroll.` : `There's no database record for ${message.member}. Make sure to *!enroll* first.`}`)
        .setColor(0xAF364C)
        .setTimestamp()
      message.channel.send('', logMessage)
    } else {
      // Find out the MC UUID of the name input
      response = await request(`https://api.mojang.com/users/profiles/minecraft/${ign}`)
      const {id, name} = JSON.parse(response.body)

      // Request mojang API
      response = await request(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`)
      // Respond with an error message if there are any issues
      if (response.statusCode !== 200 || response.error) {
        let logMessage = new Discord.RichEmbed()
          .setTitle(`Link request failed!`)
          // If it's admin linking somebody else, display custom message.
          .setDescription(`An error occured while contacting the Mojang API`)
          .addField('\u200b', '\u200b')
          .addField('Response code', response.statusCode, true)
          .addField('Error', response.error, true)
          .addField('Recieved', response.body)
          .setColor(0xAF364C)
          .setTimestamp()
        message.channel.send(message.client.eris.getRandomMessage('linkAccountCommand', 'errorMojang'), logMessage)
      } else {
        const {properties} = JSON.parse(response.body)

        let importantValue = properties.filter(property => property.name === 'textures')[0]
        let texture = JSON.parse(Buffer.from(importantValue.value, 'base64').toString('utf8')).textures

        let logMessage = new Discord.RichEmbed()
          .setAuthor(member.get('discord.tag'), member.get('discord.avatarURL'))
          .setColor(0x7473B3)
          .setDescription(`New link request for <@${member.get('discord.id')}>`)
          .addField('Account name', member.get('discord.name', true))
          .addField('Account ID', member.get('_id', true))
          .addField('Minecraft name', name, true)
          .addField('Minecraft UUID', id, true)
          .setThumbnail(`https://minotar.net/helm/${name}/100.png`)
          .setFooter(`Confirmation ID ${message.id}`)
          .setTimestamp()

        // Confirmation filter
        const filter = m => m.content.startsWith(`!confirmlink ${message.id}`)

        // Send overview
        message.channel.send(`Please check the details listed bellow and make sure there aren't any typos.\nTo confirm the link request, please type **!confirmlink ${message.id}**`, logMessage)
        // Await confirmation
        message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
          .then(collected => {

            /* ACTUAL LINK HAPPENING HERE */

            // TODO: Check if other user already has linked the same account
            // TODO: Make sure linking multiple accounts actually works

            // If no account was linked, specify the minecraft field to be an array.
            if (member.get('minecraft') === null || member.get('minecraft') === undefined) {
              member.set('minecraft', [])
            }
            // Get the newly created field
            let minecraftAccount = member.get('minecraft')
            // Insert Minecraft account information.
            minecraftAccount.push({
              linkedAt: new Date(),
              confirmationID: message.id,
              approved: adminlink,
              uuid: id,
              ign: name,
              texture
            })

            // Save
            member.set('minecraft', minecraftAccount)
            member.save()

            // Confirm request
            let confirmationMessage = new Discord.RichEmbed()
              .setTitle(`Link request sent!`)
              // If it's admin linking somebody else, display custom message.
              .setDescription(`${adminlink ? `The link was automatically accepted. (Admin Override)` : `An Admin will have to approve this action. You'll be notified when this happens.`}`)
              .setColor(0x337489)
              .setTimestamp()
            message.channel.send(message.client.eris.getRandomMessage('linkAccountCommand', 'requestConfirmed'), confirmationMessage)

            // TODO: Provide more informations for Admins, such as account age, date joined, and provide a link to user's namemc page.

            // Notify admins and log
            let logMessage = new Discord.RichEmbed()
              .setAuthor(member.get('discord.tag'), member.get('discord.avatarURL'))
              .setColor(0x7473B3)
              .setDescription(`New link request for <@${member.get('discord.id')}>`)
              .addField('Account name', member.get('discord.name', true))
              .addField('Minecraft name', name, true)
              .addField('Minecraft UUID', id, true)
              .setThumbnail(`https://minotar.net/helm/${name}/100.png`)
              .setFooter(`Confirmation ID ${message.id}`)
              .setTimestamp()
            client.channels.get(client.eris.config.guild.channels.logs).send(`${adminlink
              ? message.client.eris.getRandomMessage('linkAccountCommand', 'logsAutoaccepted')
              : message.client.eris.getRandomMessage('linkAccountCommand', 'logsConfirmationNeede')}`, logMessage)
          })
          .catch(collected => {
            let logMessage = new Discord.RichEmbed()
              .setTitle(`Link request canceled!`)
              // If it's admin linking somebody else, display custom message.
              .setDescription(`Link request with a Confirmation ID *${message.id}* has been cancelled, no confirmation was given.`)
              .setColor(0xAF364C)
              .setTimestamp()
            message.channel.send(message.client.eris.getRandomMessage('linkAccountCommand', 'requestTimeout'), logMessage)
          })
      }
    }
  }

}
