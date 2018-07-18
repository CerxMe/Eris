/*
 * getActiveHour() returns a string used to increase ActivityScore in database
 */

const moment = require('moment')
module.exports = (client) => {
  client.eris.getActiveTime = (time = new Date()) => {
    try {
      return `activity.${moment(time).utc().format('dddd')}.${moment(time).utc().format('HH')}`
    } catch (e) {
      console.log(`getActiveTime() failed (invalid parameters?): ${e}`)
      return false
    }
  }
  console.log(`Utility registered: getActiveHour()`)
}
