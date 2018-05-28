/*
 *  Log the uses of emoji reactions to the database
 */

module.exports = async (message, testCase, stringToTest) => {
  const StatsCollection = message.client.eris.models.ReactionStats

  // Find database entry for the reaction
  let reaction = await StatsCollection.findOne({reaction: testCase['emoji']})

  // Create a new entry if there isnt one already
  if (reaction === null) {
    reaction = new StatsCollection(
      {
        createdAt: new Date(),
        reaction: testCase['emoji'],
        totalUses: 0,
        triggers: {}
      }
    )
  }

  // Increase the number of total uses
  reaction.set('totalUses', reaction.get('totalUses') + 1)

  // Go over each trigger
  await testCase['triggers'].forEach(trigger => {
    // If the trigger matches
    if (stringToTest.includes(trigger)) {
      // Log information about the last message that invoked this reaction
      reaction.set(`triggers.${trigger}`, {
        lastMessage: {
          createdAt: message.createdAt,
          channel: {
            id: message.channel.id,
            name: message.channel.name
          },
          author: {
            id: message.member.id,
            name: message.member.displayName
          },
          content: message.content
        }
      })

      // Increase the number of uses for this trigger
      let triggerUses = reaction.get(`triggers.${trigger}.uses`) === null || isNaN(reaction.get(`triggers.${trigger}.uses`)) ? 1 : reaction.get(`triggers.${trigger}.uses`) + 1
      reaction.set(`triggers.${trigger}.uses`, triggerUses)
    }
  })

  // Save the recored in the databse
  await reaction.save()
}
