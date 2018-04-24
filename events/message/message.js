/*
 * Command Handler
 */

module.exports = (client, message) => {

  require('./messageLog')(client, message)

  const prefix = client.eris.config.prefix

  // Ignore messages that are not starting with the bot prefix or were sent by a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // While in development mode, only accept messages from the super secret #bot-test-channel
  if (client.eris.config.devmode && message.channel.id !== client.eris.config.guild.channels.devtest) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.eris.commands.has(command)) return

  try {
    client.eris.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
}
