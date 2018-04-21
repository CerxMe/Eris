const reqEvent = (event) => require(`./events/${event}`)
module.exports = client => {
  // When the bot is connected to discord and ready to uperate
  client.on('ready', () => reqEvent('ready')(client))

  // Everytime new message shows up
  client.on('message', message => reqEvent('message')(client, message))
}
