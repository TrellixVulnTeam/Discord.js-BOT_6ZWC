const { debug } = require("console");
const discord = require("discord.js");
const botConfig = require("../botconfig.json");

const debugMode = botConfig.debugMode;

async function main(bot, interaction) {
    // DEBUG:
    if (debugMode) {
        console.log("[app - debug][move] DEBUG:", await interaction.data.options[0].options)
        if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options[0].options.find(option => option.name == "current_channel"))) console.log("[app - debug][move] CUR");
        if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options[0].options.find(option => option.name == "destination_channel"))) console.log("[app - debug][move] DES");
    }

    if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray().find(permission => permission == "MANAGE_MESSAGES")) {
        if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options[0].options.find(option => option.name == "current_channel"))) {
            if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options[0].options.find(option => option.name == "current_channel").value).members) {
                await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options[0].options.find(option => option.name == "current_channel").value)
                .members.each(member => bot.guilds.cache.get(interaction.guild_id).members.cache.get(member.user.id)
                .voice.setChannel(interaction.data.options[0].options.find(option => option.name == "destination_channel").value));
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Users have been moved."
                        }
                    }
                })
            } else {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "There are no users in the given voice channel."
                        }
                    }
                })
            }
        } else {
            if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).voice.channelID) {
                const current_channel_id = await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).voice.channelID;
                await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(current_channel_id)
                .members.each(member => bot.guilds.cache.get(interaction.guild_id).members.cache.get(member.user.id)
                .voice.setChannel(interaction.data.options[0].options.find(option => option.name == "destination_channel").value));
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Users have been moved."
                        }
                    }
                })
            } else {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "You are currently not in a voice channel. Either join one, or pass a \"current_channel\" argument."
                        }
                    }
                })
            }
        }
    } else {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "You are not allowed to move users."
                }
            }
        })
    }
}

module.exports = { main }