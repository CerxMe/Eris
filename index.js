const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client()

// Define custom data container
client.eris = new Discord.Collection()

// Import configuration
client.eris.config = require('./config.json')

// Load Commands
client.eris.commands = new Discord.Collection()
console.log(client.eris)

const commandFiles = fs.readdirSync('./commands')

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  console.log(`Initializing ${file}`)
  client.eris.commands.set(command.name, command)
}

// Register Events
require('./eventLoader.js')(client)

// Login to Discord
client.login(client.eris.config.token)
