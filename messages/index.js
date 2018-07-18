/*
 *  Message indexer, dynamically load all strings from this directory.
 */

const fs = require('fs')

module.exports = (client, Discord) => {
  // Function to retrieve a random message
  client.eris.getRandomMessage = (collection, set) => {
    let messages = client.eris.messages.get(collection)[set]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  // Initialize a new collection
  client.eris.messages = new Discord.Collection()

  // Go trough all the messages
  const messagesFiles = fs.readdirSync('./messages')
    .filter(file => file !== 'index.js') // Exclude this file.

  // Add messages to the collection
  for (const file of messagesFiles) {
    const messages = require(`./${file}`)
    const name = file.replace(/\.[^/.]+$/, '')
    console.log(`Loaded message strings from ${file}`)
    client.eris.messages.set(name, messages)
  }
}
