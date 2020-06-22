const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {

    // !announcement [title] :: [message] :: [color] :: [channel]

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.respond("You're not allowed to do that, sorry!");

    var splitter = "::";

    if(arguments[0] == null){

        var useMessage = new discord.RichEmbed()
            .setTitle("**Announcement command**")
            .setColor("#cfb53b")
            .setDescription(`Create an announcement, use:\n${botConfig.prefix}announcement [title] ${splitter} [message] ${splitter} {color} ${splitter} {channel}`);

        return message.channel.send(useMessage);

    }

    arguments = arguments.join(" ").split(splitter);
    console.log(arguments);

    if(arguments[2] == undefined) arguments[2] = "#cfb53b";
    if(arguments[3] == undefined) arguments[3] = "general"

    var option = {
        
        titel: arguments[0],
        bericht: arguments[1] || `No message was passed through. please use ${botConfig.prefix}announcement [title] ${splitter} [message] ${splitter} {color} ${splitter} {channel}`,
        kleur: arguments[2].trim(),
        kanaal: arguments[3].trim()

    }

    var announcer = message.author;

    var announcementEmbed = new discord.RichEmbed()
        .setTitle(`**${option.titel}**`)
        .setColor(option.kleur)
        .setDescription(`message from ${announcer}:\n${option.bericht}\n`)
        .setTimestamp();

    var announcementChannel = message.guild.channels.find(`name`, option.kanaal);
    if(!announcementChannel) return message.reply("Could not find the given channel.");

    announcementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "announcement"
}