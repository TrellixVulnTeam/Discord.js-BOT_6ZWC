const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {

    if (arguments != "") {
        message.reply(`Syntax Error: unused argument "${arguments}" was provided. Use ${botConfig.prefix}help when struggeling.`);
    } else {
    message.channel.send("!pong: " + Math.abs(Date.now() - message.createdTimestamp) + "ms");
    }
}

module.exports.help = {
    name: "ping"
}