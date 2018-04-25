module.exports = async (client, newMember) => {
  const MemberCollection = client.eris.models.Member

  let member = await MemberCollection.findOne({'discord.id': newMember.id})

  if (member !== null) {
    member.set('discord.color', newMember.displayHexColor)
    await member.save()
  }
}
