const reqEvent = (event) => require(`./${event}`)
module.exports = client => {
  // When the bot is connected to discord and ready to operate
  client.on('ready', () => reqEvent('ready')(client))

  // Everytime new message shows up
  client.on('message', message => reqEvent('message')(client, message))
}
