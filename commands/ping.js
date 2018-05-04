module.exports = {
  name: 'ping',
  description: 'Ping!',
  aliases: ['test'],
  execute (message) {
    message.channel.send('Pong.')
  }
}
