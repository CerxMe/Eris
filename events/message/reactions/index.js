/*
 * React to messages that contain a keyword with an emoji
 */

const {map} = require('./emoji.json')

module.exports = (message) => {
  const stringToTest = message.content.toLocaleLowerCase()
  try {
    // go trough all the emoji
    map.forEach(async testCase => {
      // check for triggers
      if (testCase['triggers'].some(trigger => stringToTest.includes(trigger))) {
        // react with emoji if trigger is found
        message.react(message.client.emojis.find('name', testCase['emoji']))

        // log usage to database
        require('./reactionStats')(message, testCase, stringToTest)
      }
    })
  } catch (e) {
    console.log(e)
  }
}
