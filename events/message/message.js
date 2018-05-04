/*
 * Command Handler
 */

module.exports = (client, message) => {
  // Ignore Direct Messages
  if (message.channel.type !== 'text') return

  require('./messageCounter')(message)

  const prefix = client.eris.config.prefix

  // Ignore messages that are not starting with the bot prefix or were sent by a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // While in development mode, only accept messages from the super secret #bot-test-channel
  if (client.eris.config.devmode && message.channel.id !== client.eris.config.guild.channels.devtest) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = client.eris.commands.get(commandName) ||
      client.eris.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
}
