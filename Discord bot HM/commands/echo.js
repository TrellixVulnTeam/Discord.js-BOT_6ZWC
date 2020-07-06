const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {

    if (arguments != "") {
        console.log(`${message.author.name} send an echo: ${arguments}`);
        message.delete();
        message.channel.send(arguments.join(" "));
    } else {
        message.reply(`Syntax Error: 1+ arguments were expected, 0 were given. Use ${botConfig.prefix}help when struggeling.`);
    }
}

module.exports.help = {
    name: "echo"
}