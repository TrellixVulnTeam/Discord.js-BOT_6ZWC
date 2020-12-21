const discord = require("discord.js");
const { url } = require("inspector");

module.exports.run = async (bot, message, arguments) => {
    embed1 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("FIA - Formula One", "https://www.formula1.com/etc/designs/fom-website/images/fia_logo.png", "https://www.formula1.com/")
        .setTitle("Driver Of The Day")
        .setDescription("Go vote for the driver of the day over at https://www.formula1.com/en/vote.html and make sure to vote before the end of the race!")
        .setThumbnail("https://www.dhlexpress.be/wp-content/uploads/2017/02/dhl-logo.png");
    embed2 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("Heilige Maagden | GOD", "http://heiligemaagden.com//images/logos/heiligemaagden200x200.png")
        .setTitle("Grosjean Of The Day")
        .setDescription("Vote now for the Grosjean of the day! Who did the most stupid and dangerous move? And who keeps blaiming everyone else for it? Vote now by hitting your #1 candidate down below. Be sure to vote before the end of the race!")
        .setThumbnail("https://www.formula1.com/content/dam/fom-website/drivers/R/ROMGRO01_Romain_Grosjean/romgro01.png.transform/2col/image.png");
    message.channel.send(embed1)
    message.channel.send(embed2).then(sentMessage => {
        var emojis = ["769891656551235599", "768169112765333564", "769891655951319062", "769891656304427039", "769891656140849172", "769891655926677526",
        "769891656132067378", "769891656286994442", "769891656244789279", "769891656304295957", "769891656077541376", "769891656262483978", "769891656082128917",
        "769891655934803999", "769891655389937704", "769891656111226900", "769891656148189214", "769891656123940864", "769891655532544020", "769891652252336138"];
        var emoji;
        for (emoji of emojis) {
            sentMessage.react(emoji)
        }
    })
    message.delete();
}

module.exports.help = {
    name: "vote"
}