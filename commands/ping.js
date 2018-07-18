module.exports = {
  name: 'ping',
  description: 'Ping!',
  aliases: ['test', 'fetch'],
  async execute (message, args) {
    const client = message.client
    let guild = client.guilds.find('id', client.eris.config.guild.id)
    console.log(guild.createdAt)
  }
}
