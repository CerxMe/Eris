/*
 *  Message indexer, dynamically load all strings from this directory.
 */

const fs = require('fs')

module.exports = (client, Discord) => {

  client.eris.getRandomMessage = (collection, set) => {
    let messages = client.eris.messages.get(collection)[set]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  client.eris.messages = new Discord.Collection()

  const messagesFiles = fs.readdirSync('./messages')
      .filter(file => file !== 'index.js') // Exclude this file.

  for (const file of messagesFiles) {
    const messages = require(`./${file}`)
    const name = file.replace(/\.[^/.]+$/, '')
    console.log(`Loaded message strings from ${file}`)
    client.eris.messages.set(name, messages)
  }
}
