/*
 * getMember(arg) takes in discordjs's member object, a discord mention (as string - <@123456789>), IGN, or UUID and returns a member's database object (can be null if database dosnt have that record) or false when arg is incorrect
 */

/*
 TODO: post this note to team members
    You can easily access data about enrolled member with new utility function
    Args can be a discord mention (as a string), ign, uuid, or the member parameter (message.member)
    let member = await client.eris.getMember(args)
    console.log(member.get())
 */

// TODO: Handle UUIDs and Minecraft IGNs.

module.exports = (client) => {
  const MemberCollection = client.eris.models.Member

  // Find a database entry for the member
  client.eris.getMember = async (testString) => {
    // handle when you pass in the discordjs member variable directly
    if (testString.id !== undefined) { return MemberCollection.findOne({'discord.id': testString.id}) }

    const regex = {
      mention: /<(?:(?:@)|(?:@!))(\d+)>/,
      uuid: /[0-9a-f]{32}|[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}/,
      ign: /^[a-zA-Z0-9_]{1,16}$/
    }

    let validate = [
      regex.mention.exec(testString),
      regex.uuid.exec(testString),
      regex.ign.exec(testString)
    ]

    if (validate[0]) { // Discord mention
      return MemberCollection.findOne({'discord.id': validate[0][1]})
    } else if (validate[1]) { // Minecraft UUID
      console.log(validate[1][0])
      return 'uuid'
    } else if (validate[2]) { // Minecraft IGN
      console.log(validate[2][0])
      return 'ign'
    } else {
      return false
    }
  }
  console.log(`Utility registered: getMember()`)
}
