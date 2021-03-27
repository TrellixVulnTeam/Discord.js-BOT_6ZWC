const discord = require("discord.js");
const { url } = require("inspector");
const botConfig = require("../botconfig.json");

async function main(bot, interaction) {
    embed1 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("FIA - Formula One", "https://www.formula1.com/etc/designs/fom-website/images/fia_logo.png", "https://www.formula1.com/")
        .setTitle("Driver Of The Day")
        .setDescription("Go vote for the driver of the day over at https://www.formula1.com/en/vote.html and make sure to vote before the end of the race!")
        .setThumbnail("https://www.dhlexpress.be/wp-content/uploads/2017/02/dhl-logo.png");
    embed2 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("Heilige Maagden | GOD", "https://cdn.discordapp.com/avatars/585966568169799704/5232d5816ef287d4cffae1f85afde16a.png?size=256")
        .setTitle("Grosjean Of The Day")
        .setDescription("Vote now for the Grosjean of the day! Who did the most stupid and dangerous move? And who keeps blaiming everyone else for it? Vote now by hitting your #1 candidate down below. Be sure to vote before the end of the race!")
        .setThumbnail("https://www.formula1.com/content/dam/fom-website/drivers/R/ROMGRO01_Romain_Grosjean/romgro01.png.transform/2col/image.png");
    /*message.channel.send(embed1)
    message.channel.send(embed2).then(sentMessage => {
        var emojis = ["769891656551235599", "768169112765333564", "769891655951319062", "769891656304427039", "769891656140849172", "769891655926677526",
        "769891656132067378", "769891656286994442", "769891656244789279", "769891656304295957", "769891656077541376", "769891656262483978", "769891656082128917",
        "769891655934803999", "769891655389937704", "769891656111226900", "769891656148189214", "769891656123940864", "769891655532544020", "769891652252336138"];
        var emoji;
        for (emoji of emojis) {
            sentMessage.react(emoji)
        }
    })
    message.delete();*/
    await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                //content: "hey"
                embeds: [embed1, embed2]
            }}
    })
    await bot.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).messages.fetch({limit: 1}).then(messages => {
        var lastMessage  = messages.first();
        var emojis = ["825451159002939463", "825451159368106064", "825451159250665524", "825451159279501343", "825451159258005524", "825451159405199370", "825451159216193626",
        "825451159141482546", "825451159170318386", "825451159153803285", "825451159258660864", "825451159015129128", "825451159153672242", "825451159153672262",
        "825451159186702377", "825451158944350289", "825451158788374548", "825451156494090240", "825451159036493825", "825451159178575892"];
        var emoji;
        for (emoji of emojis) {
            lastMessage.react(emoji);
        }
    })
}

module.exports = { main }