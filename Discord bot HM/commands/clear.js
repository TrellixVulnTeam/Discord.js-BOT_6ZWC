const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function main(bot, interaction) {
    //console.log(await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id));
    //console.log(interaction.member.user.id);
    if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray().find(permission => permission == "MANAGE_MESSAGES")) {
        if (interaction.data.options.find(option => option.name == "channel_id")) {
            if (interaction.channel_id == interaction.data.options.find(option => option.name == "channel_id").value) {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `Clearing ${interaction.data.options.find(option => option.name == "amount").value} messages.`
                        }
                    }
                })
                sleep(2000).then(() => {
                    bot.channels.cache.get(interaction.channel_id).bulkDelete(interaction.data.options.find(option => option.name == "amount").value + 1);
                })
            } else {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `Clearing ${interaction.data.options.find(option => option.name == "amount").value} messages from <#${interaction.data.options.find(option => option.name == "channel_id").value}>.`
                        }
                    }
                })
                sleep(2000).then(() => {
                    bot.channels.cache.get(interaction.data.options.find(option => option.name == "channel_id").value).bulkDelete(interaction.data.options.find(option => option.name == "amount").value);
                })
            }
        } else {
            await bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Clearing ${interaction.data.options.find(option => option.name == "amount").value} messages.`
                    }
                }
            })
            sleep(2000).then(() => {
                bot.channels.cache.get(interaction.channel_id).bulkDelete(interaction.data.options.find(option => option.name == "amount").value + 2);
            })
        }
    }
}

/*
module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You're not allowed to do that! Sorry");
    if (arguments[1]) return message.reply(`Syntax Error: 1 argument was expected, 2+ were given: ${arguments}. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    if (!arguments[0]) return message.reply(`Syntax Error: 1 argument was expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    else if (Number.isInteger(parseInt(arguments[0]))){
        var amount = parseInt(arguments[0]) + 1;
        message.channel.bulkDelete(amount).then(() => {
            if(arguments[0] == 0){
                message.reply("Unable to delete 0 messages, A55H0L3!");
            } else if (arguments[0] == 1){
                message.reply("1 message was deleted.").then(message => message.delete({timeout: 3000}));
            } else{
                message.reply(`${arguments[0]} messages where deleted.`).then(message => message.delete({timeout: 3000}));
            }
        });
    } else {
        return message.reply(`The given argument wasn't an integer. Please use ${botConfig.prefix}clear [amount]`);
    }

}*/

module.exports = { main }