const discord = require("discord.js");
const botConfig = require("../botconfig.json");

async function main(bot, interaction) {
    if (interaction.guild_id != "585896430380777503") {
        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "You must be in the Heilige Maagden discord server to use this command."
                }
            }
        })
    } else {
        if (await interaction.data.options[0].value == true) {
            if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray().find(permission => permission == "MANAGE_MESSAGES")) {
                var invite = await bot.guilds.cache.get(interaction.guild_id).channels.cache.get("589840871562805258").createInvite({
                    maxUses: 1,
                    maxAge: 86400,
                    temporary: false
                })
                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `Send this link to your friend in order to invite him to the server:\n\`https://www.discord.gg/${invite.code}\``
                        }
                    }
                })
            } else {
                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "You are not allowed to create permanent invites into this server."
                        }
                    }
                })
            }
        } else if (await interaction.data.options[0].value == false) {
            var invite = await bot.guilds.cache.get(interaction.guild_id).channels.cache.get("589840871562805258").createInvite({
                maxUses: 1,
                maxAge: 3600,
                temporary: true
            })
            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Send this link to your friend to gain him acces to this server.\nThis acces will be revoked once the user closes discord.\n\`https://www.discord.gg/${invite.code}\``
                    }
                }
            })
        }
    }
}

module.exports = { main }