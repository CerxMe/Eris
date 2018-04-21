const fs = require('fs')

module.exports = (client, Discord) => {
  client.eris.commands = new Discord.Collection()

  const commandFiles = fs.readdirSync('./commands')
      .filter(file => file !== 'index.js')

  for (const file of commandFiles) {
    const command = require(`./${file}`)
    console.log(`Loaded command ${file}`)
    client.eris.commands.set(command.name, command)
  }
}
