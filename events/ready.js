/*
 * Emitted whenever bot gets connected to Discord and is ready to do stuff
 */

module.exports = client => {
  console.log(`Logged in as ${client.user.username}, present in ${client.guilds.size} guild${client.guilds.size > 1 ? '' : 's'}.`)
}
