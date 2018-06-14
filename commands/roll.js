const Discord = require('discord.js')
const Roll = require('roll')
module.exports = {
  name: 'roll',
  description: 'Roll some dice, get a result',
  aliases: ['dice'],
  async execute(message, args) {
    try {
      if (!args[0]) {
        const logMessage = new Discord.RichEmbed()
          .setColor(message.client.eris.config.responseColors.errorResponse)
          .setDescription("You forgot to enter the roll requirements.. Try again with ?roll 2d20")
        message.channel.send(logMessage);
      } else {

        roll = new Roll();
        let RollRequirements = args[0];
        let valid = roll.validate(RollRequirements);

        if (!valid) {
          const embed = new Discord.RichEmbed()
            .setColor(message.client.eris.config.responseColors.errorResponse)
            .addField("Roll Requirements Not Valid", RollRequirements)
            .addField("Try Again With Something Like", "2d6 or 4d20")
          message.channel.send({
            embed
          });
        } else {
          let RollValue = roll.roll(RollRequirements);
          const embed = new Discord.RichEmbed()
            .setColor(message.client.eris.config.responseColors.positiveResponse)
            .addField("Roll Breakdown:", RollValue.rolled)
            .addField("Roll Total: ", "🎲 " + RollValue.result)
          message.channel.send({
            embed
          });

        }
      }
    } catch (e) {
      let logMessage = new Discord.RichEmbed()
        .setTitle("Can't Roll Dice")
        .setColor(message.client.eris.config.responseColors.errorResponse)
        .setDescription(e)
      message.channel.send(message.client.eris.getRandomMessage('8ballCommand', 'error'), logMessage)
    }
  }
}
/* Author : Tommin */
/* Date : June 3 2018 */
