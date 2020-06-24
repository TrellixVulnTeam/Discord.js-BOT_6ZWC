const discord = require("discord.js");
const botConfig = require("../botconfig.json");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async (bot, message, arguments) => {

    if (!arguments[0]) return message.channel.send("1 argument was expcted, 0 where given.").then(message => message.delete(10000));
//    console.log(message.member.user.tag + ": " + arguments.join(" "));  //Activate when too much swearing!
    message.delete(0);
    message.channel.send(arguments.join(" "));
//    console.log(`This is an ${botConfig.prefix}echo command. The input of the command was ${arguments}. The given output was ${arguments.join(" ")}`);

}

module.exports.help = {
    name: "unk"
}