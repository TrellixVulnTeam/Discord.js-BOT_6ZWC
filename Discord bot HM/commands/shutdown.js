const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function main(bot, interaction) {
    console.log(await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray())
    if (await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).permissions.toArray().find(permission => permission == "ADMINISTRATOR")) {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            }
        })
        var array = await bot.api.applications(bot.user.id).guilds("675043823511928881").commands.get();
        await array.forEach(element => {
            bot.api.applications(bot.user.id).guilds("675043823511928881").commands(element.id).delete();
        });
        console.log("HMEA:", await bot.api.applications(bot.user.id).guilds("675043823511928881").commands.get());
        var array2 = await bot.api.applications(bot.user.id).guilds("585896430380777503").commands.get();
        await array2.forEach(element => {
            bot.api.applications(bot.user.id).guilds("585896430380777503").commands(element.id).delete();
        });
        console.log("HM:", await bot.api.applications(bot.user.id).guilds("585896430380777503").commands.get());
    }
}

module.exports = { main }