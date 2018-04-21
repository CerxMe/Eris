module.exports = (client, message) => {
  // Command Handler
  const prefix = client.eris.config.prefix

  if (!message.content.startsWith(prefix) || message.author.bot) return

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
