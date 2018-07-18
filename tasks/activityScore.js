const schedule = require('node-schedule')
module.exports = client => {
  client.eris.activityScoreTask = schedule.scheduleJob('* * * * *', function () {
    // TODO: Finish this
    console.log(client.guilds.find(client.eris.config.guild.id))
  })
}
