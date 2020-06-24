const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments) => {

    // !clear x

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You're not allowed to do that! Sorry");

    if(!arguments[0]) return message.reply(`1 argument was expected, 0 where received. Please use ${botConfig.prefix}clear [amount]`);

    if(Number.isInteger(parseInt(arguments[0]))){

        var amount = parseInt(arguments[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if(arguments[0] == 0){
                message.reply("Unable to delete 0 messages, A55H0L3!");
            } else if (arguments[0] == 1){
                message.channel.send("1 message was deleted.").then(message => message.delete(3000));
            } else{
                message.channel.send(`${arguments[0]} messages where deleted.`).then(message => message.delete(3000));
            }

        });

    } else {
        return message.reply(`The given argument wasn't an integer. Please use ${botConfig.prefix}clear [amount]`);
    }

}

module.exports.help = {
    name: "unk"
}