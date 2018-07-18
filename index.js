/*
 *  Main entry point
 *  - load all the stuff
 *  - initialize a Discord client
 */

const Discord = require('discord.js')
const client = new Discord.Client()

// Define custom data container in the client thingy
client.eris = new Discord.Collection()

// Import configuration
client.eris.config = require('./config.json')

// Database connection
require('./db.js')(client)

// Dynamically load string messages
require('./messages')(client, Discord)

// Dynamically load Commands
require('./commands')(client, Discord)

// Event handler
//  - New events need to be registered in ./events/index.js
require('./events')(client)

// Code utilities
//  - New utils need to be added in ./utilities/index.js
require('./utilities')(client)

// Login to Discord
client.login(client.eris.config.token)
