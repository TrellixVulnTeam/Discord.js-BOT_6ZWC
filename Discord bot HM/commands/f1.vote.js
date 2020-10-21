const discord = require("discord.js");
const { url } = require("inspector");

module.exports.run = async (bot, message, arguments) => {
    embed1 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("FIA - Formula One", "https://www.formula1.com/etc/designs/fom-website/images/fia_logo.png", "https://www.formula1.com/")
        .setTitle("Driver Of The Day")
        .setDescription("Go vote for the driver of the day over at https://www.formula1.com/en/vote.html! Make sure to vote before the end of the race.")
        .setThumbnail("https://www.dhlexpress.be/wp-content/uploads/2017/02/dhl-logo.png");
    embed2 = new discord.MessageEmbed()
        .setColor("#ff1801")
        .setAuthor("Heilige Maagden | GOD", "http://heiligemaagden.com//images/logos/heiligemaagden200x200.png")
        .setTitle("Grosjean Of The Day")
        .setDescription("Vote now for the Grosjean of the day! Who did the most stupid and dangerous move? And who keeps blaiming everyone else for it? Vote now by hitting your #1 candidate down below. Be sure to vote before the end of the race!")
        .setThumbnail("https://www.formula1.com/content/dam/fom-website/drivers/R/ROMGRO01_Romain_Grosjean/romgro01.png.transform/2col/image.png");
    message.channel.send(embed1)
    message.channel.send(embed2).then(sentMessage => {
        var emojis = ["761994704031449099", "761994704442753024", "761994704149020712", "761994703662088263", "761994703779921921", "761994703767470101",
        "761994703788048396", "761994703779528705", "761994704271048734", "761994704186900490", "761994703700361227", "761994701787758602", "761994704018472990",
        "761994704169599016", "761994703755280416", "761994703494316072", "761994704547217438", "761994704127524864", "761994702399733791", "761994703989112842"];
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