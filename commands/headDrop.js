const Discord = require('discord.js')
let request, response
request = require('async-request')
const uuidv4 = require('uuid/v4')

module.exports = {
  name: 'head',
  description: 'Generates a command for head drops',
  aliases: ['headdrop'],
  async execute (message, args) {
    try {
    // Find out the MC UUID of the name input
      response = await request(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
      const {id, name} = JSON.parse(response.body)

    // Fetch the skin of the UUID
      response = await request(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`)
      const userValue = JSON.parse(response.body)['properties'][0]['value']

    // Get a random UUID to ensure player's skin doesn't change.
      const randomUUID = await uuidv4()
      const cmdString3 = '```' + `execute as @a[name=${name},scores={headDeath=1..}] run give @a[scores={headKill=1..}] player_head{display:{Name:"{"translate":"${name}'s Head","italic":false}"},SkullOwner:{Id:"${randomUUID}",Properties:{textures:[{Value:"${userValue}"}]}}} 1` + '```'

      let logMessage = new Discord.RichEmbed()
            .setTitle(name + '\'s Head Command')
            .setThumbnail('https://minotar.net/helm/' + name + '/100')
            .setColor(message.client.eris.config.responseColors.positiveResponse)
            .setDescription(cmdString3)

      message.channel.send(message.client.eris.getRandomMessage('headDropCommand', 'okay'), logMessage)
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle('Head Command generation failed:')
        .setColor(0xAA00AA)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('headDropCommand', 'error'), logMessage)
    }
  }
}
