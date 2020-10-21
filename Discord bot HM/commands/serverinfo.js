const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const { listenerCount } = require("ws");

module.exports.run = async (bot, message, arguments) => {
    var serverIcon = message.guild.iconURL();

    if (!arguments[0]) return message.reply(`Syntax Error: 1 arguments was expected, 0 were given. Use ${botConfig.prefix}help when struggeling.`);
    if (arguments[1]) return message.reply(`Syntax Error: 1 arguments was expected, 2+ were given: ${arguments}. Use ${botConfig.prefix}help when struggeling.`);
    if (arguments[0] == "server" || arguments[0] == "-s") {
        var memberList = []
        message.guild.members.cache.forEach(member => {
            if (member.displayName != "GOD"){
                memberList.push(member.displayName)
            }
        });
        var serverEmbed = new discord.MessageEmbed()
            .setDescription("info.HeiligeMaagden.server")
            .setColor("#cfb53b")
            .setThumbnail(serverIcon)
            .setTitle("Server Info - Heilige Maagden Discord")
            .addField("Name:", message.guild.name)
            .addField("Creation date:", message.guild.createdAt)
            .addField("Member count:", message.guild.memberCount)
            .addField("Memberlist:", memberList.sort().join(", "))

    } else if (arguments[0] == "bot" || arguments[0] == "self" || arguments[0] == "-b") {
        var serverEmbed = new discord.MessageEmbed()
            .setDescription("info.HeiligeMaagden.self")
            .setColor("#cfb53b")
            //.setThumbnail(serverIcon)
            .setImage("https://cdn.discordapp.com/app-icons/585966568169799704/5232d5816ef287d4cffae1f85afde16a.png?size=256")
    }

    return message.channel.send(serverEmbed);



}

module.exports.help = {
    name: "info"
}