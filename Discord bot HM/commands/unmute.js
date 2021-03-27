const discord = require("discord.js");
const botConfig = require("../botconfig.json");

async function main(bot, interaction) {
    if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray().find(permission => permission == "MANAGE_MESSAGES")) {
        if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options.find(option => option.name == "channel"))) {
            if (await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options.find(option => option.name == "channel").value).members) {
                await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.data.options.find(option => option.name == "channel").value)
                .members.each(member => bot.guilds.cache.get(interaction.guild_id).members.cache.get(member.user.id)
                .voice.setMute(false));
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Members are being unmuted!"
                        }
                    }
                });
            } else {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "There are no users in the given voice channel."
                        }
                    }
                });
            }
        } else {
            if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).voice.channelID) {
                const channel_id = await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).voice.channelID;
                await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(channel_id)
                .members.each(member => bot.guilds.cache.get(interaction.guild_id).members.cache.get(member.user.id)
                .voice.setMute(false));
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Members are being unmuted!"
                        }
                    }
                });
            } else {
                await bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "You are currently not in a voice channel. Either join one, or pass a \"channel\" argument."
                        }
                    }
                });
            }
        }
    } else {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "You are not allowed to mute users."
                }
            }
        });
    }
}

module.exports = { main }