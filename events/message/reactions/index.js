/*
 * React to messages that contain a keyword with an emoji
 */

const {map} = require('./emoji.json')

module.exports = async (message) => {
  const stringToTest = message.content.toLocaleLowerCase()
  try {
  // go trough all the emoji
    map.forEach(testCase => {
      // check for triggers
      if (testCase['triggers'].some(trigger => stringToTest.includes(trigger))) {
        // react with emoji if trigger is found
        message.react(message.client.emojis.find('name', testCase['emoji']))
      }
    })
  } catch (e) {
    console.log(e)
  }
}
