// Unfinished

const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You are not able to run this command with your current permissions. For more info, check ${botConfig.prefix}help.`).then(message => message.delete({timeout: 3000}));
    if (!arguments[0]) return message.reply(`Syntax Error: 1+ arguments where expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    
    argumentsString = arguments.join(" ");
    jsonmessage = JSON.parse(argumentsString);
    message.channel.send({embed: jsonmessage});
    message.delete();
}

module.exports.help = {
    name: "announce"
}