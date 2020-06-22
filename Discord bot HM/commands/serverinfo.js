const discord = require("discord.js");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async (bot, message, arguments) => {

    var serverIcon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
        .setDescription("Discord.HeiligeMaagden.info")
        .setColor("#cfb53b")
        .setThumbnail(serverIcon)
        .addField("Server naam:", message.guild.name)
        .addField("U kwam in de server op:", message.member.joinedAt)
        .addField("Totaal aantal personen:", message.guild.memberCount);

    console.log("Dit it!")
    
    return message.channel.send(serverEmbed);



}

module.exports.help = {
    name: "serverinfo"
}