const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments, options) => {
    message.delete(10);
    message.channel.send("updated.").then(message => message.delete(3000));
}

module.exports.help = {
    name: "unk"
}