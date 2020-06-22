const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const index = require("../index.js")
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async (bot, message, arguments) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("Discord.HeiligeMaagden.bots.info")
        .setColor("#cfb53b")
        .setThumbnail(botIcon)
        .addField("Bot name:", bot.user.username)
        .addField("Bot created on:", bot.user.createdAt);

//    console.log(`This is an ${index.prefix}botInfo (//${index.prefix}botinfo) command. This command has no input var. The given output can not be displayed in a termminal/cmd.`);

    return message.channel.send(botEmbed);


}

module.exports.help = {
    name: "botinfo"
}