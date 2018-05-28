/*
 * Command Handler
 */

module.exports = (client, message) => {
  // Ignore Direct Messages
  if (message.channel.type !== 'text') return

  require('./messageCounter')(message)

  const prefix = client.eris.config.prefix

/* is this the place for emoji reactions ? */

if (message.content.toLocaleLowerCase().includes('elkia')) {
    message.react(client.emojis.find('name', 'elkiaTM'))
  }
  if (message.content.toLocaleLowerCase().includes('tommin')) {
    message.react(client.emojis.find('name', 'flashbolt'))
  }
  if (message.content.toLocaleLowerCase().includes('137614748169535488')) {
    message.react(client.emojis.find('name', 'flashbolt'))
  }
  if (message.content.toLocaleLowerCase().includes('cerx')) {
    message.react(client.emojis.find('name', 'cerx'))
  }
  if (message.content.toLocaleLowerCase().includes('serx')) {
    message.react(client.emojis.find('name', 'cerx'))
  }
  if (message.content.toLocaleLowerCase().includes('81408444879339520')) {
    message.react(client.emojis.find('name', 'cerx'))
  }
  if (message.content.toLocaleLowerCase().includes('hipster')) {
    message.react(client.emojis.find('name', 'hipster'))
  }

  if (message.content.toLocaleLowerCase().includes('brockle')) {
    message.react(client.emojis.find('name', 'broccoli'))
  }
  if (message.content.toLocaleLowerCase().includes('106943061476519936')) {
    message.react(client.emojis.find('name', 'broccoli'))
  }




  if (message.content.toLocaleLowerCase().includes('cao')) {
    message.react(client.emojis.find('name', 'penguin'))
  }
  if (message.content.toLocaleLowerCase().includes('188353383516602378')) {
    message.react(client.emojis.find('name', 'penguin'))
  }

  if (message.content.toLocaleLowerCase().includes('wylker')) {
    message.react(client.emojis.find('name', 'honk'))
  }

  if (message.content.toLocaleLowerCase().includes('206514809498370050')) {
    message.react(client.emojis.find('name', 'honk'))
  }

  if (message.content.toLocaleLowerCase().includes('anubis')) {
    message.react(client.emojis.find('name', 'batmoji'))
  }

  if (message.content.toLocaleLowerCase().includes('136962804841185280')) {
    message.react(client.emojis.find('name', 'batmoji'))
  }

  if (message.content.toLocaleLowerCase().includes('lemur')) {
      message.react(client.emojis.find('name', 'ham'))
  }
  if (message.content.toLocaleLowerCase().includes('306947044516560896')) {
      message.react(client.emojis.find('name', 'ham'))
  }
  if (message.content.toLocaleLowerCase().includes('ham')) {
      message.react(client.emojis.find('name', 'ham'))
  }
  if (message.content.toLocaleLowerCase().includes('eh')) {
      message.react(client.emojis.find('name', 'canada'))
  }

  if (message.content.toLocaleLowerCase().includes('sorry')) {
      message.react(client.emojis.find('name', 'canada'))
  }









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
