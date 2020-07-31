const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {
    if (arguments != "") {
        message.reply(`Syntax Error: unused argument "${arguments}" was provided. Use ${botConfig.prefix}help when struggeling.`);
    };

    const categoryid = "625776086730407946";

    if (message.channel.parentID != categoryid){
        message.channel.send("This command can't be used inside this channel.").then(message => message.delete({timeout: 10000}));
    } else if (!(message.member.roles.find(role => role.name === "Owner"))) {
        message.channel.send("You do not have permission to run this command.").then(message => message.delete({timeout: 10000}));
    } else {
        message.channel.delete();
    }
}

module.exports.help = {
    name: "close"
}