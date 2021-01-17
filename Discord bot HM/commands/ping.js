const discord = require("discord.js");
const botConfig = require("../botconfig.json");

async function main(bot, interaction) {
    console.log(interaction)
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: String("/pong") // actual ping to server missing.
            }
        }
    })
}

module.exports = { main }