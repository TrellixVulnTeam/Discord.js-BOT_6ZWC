const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {

    message.channel.send("pong: " + (Date.now() - message.createdTimestamp) + "ms");

}

module.exports.help = {
    name: "ping"
}