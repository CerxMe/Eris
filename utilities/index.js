/*
 *  Coding utilities, reusable functions
 */

module.exports = client => {
  require('./getActiveTime')(client)
  require('./getMember')(client)
}
