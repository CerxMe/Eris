const Discord = require('discord.js')

module.exports = {
  // Let me know if I did this correctly please! First time using git =P
  name: 'ping',
  description: 'Ping!',
  aliases: ['headdrop'],
  execute (message) {
    // Find out the MC UUID of the name input
    var ToCheck = message.content;
    var nameToCheck = ToCheck.split(" ")[1];
    var getUUID = "https://api.mojang.com/users/profiles/minecraft/" + nameToCheck;
    request(getUUID, function (err, data) {
      if (err != null) {
        console.log('Error');
      } else {
        // Store the fetched data
        var JSONData = JSON.parse(data.body);
        var UUID = JSONData.id;
        var Username = JSONData.name;

        // Fetch the skin of the UUID
        var getUserDetails = "https://sessionserver.mojang.com/session/minecraft/profile/" + UUID;
        request(getUserDetails, function (err, data) {
          if (err != null) {
            console.log(err);
          } else {
            var JSONUserData = JSON.parse(data.body);
            var userValue = JSONUserData['properties'][0]['value'];

            // Get a random UUID to ensure player's skin doesn't change.
            request("https://www.uuidgenerator.net/api/version4", function (err, data) {
              if (err != null) {
                console.log('Error');
              } else {
                var rngUUID = data.body.toString();
                rngUUID = rngUUID.replace(/^\s+|\s+$/g, '');
                var cmdString3 = "```execute as @a[name=" + Username + ",scores={headDeath=1..}] run give @a[scores={headKill=1..}] player_head{display:{Name:\"{\\\"translate\\\":\\\"" + Username + "\'s Head\\\",\\\"italic\\\":false}\"" + ",SkullOwner:{Id:\"" + rngUUID + "\",Properties:{textures:[{Value:\"" + userValue + "\"}]}}} 1```"
                const embed = new Discord.RichEmbed()
                  .setTitle(Username + '\'s Head Command')
                  .setThumbnail("https://minotar.net/helm/" + Username + "/100")
                  .setColor(0x00AAAA)
                  .setDescription(cmdString3)
                message.channel.send({embed});
                })
              }
            })
          }
        })
      }
	}
  }
}