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
    } else if (interaction.channel_id != "589840871562805258") {
        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Your message will be posted in the <#589840871562805258> text channel."
                }
            }
        })
        bot.channels.cache.get("589840871562805258").send(interaction.data.options.find(option => option.name == "message").value);
    } else {
        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 3,
                data: {
                    content: interaction.data.options.find(option => option.name == "message").value
                }
            }
        })
    }
}

module.exports = { main }