const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, arguments) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("U hebt geen rechten om de Server te wijzigen. Sorry!");

    if (!arguments[0]) return message.reply("U dient een nieuwe prefix mee te geven");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefixes: arguments[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    var stringEmbed = new discord.RichEmbed()
        .setColor("#cfb53b")
        .setTitle("GOD - Prefix Change")
        .setDescription(`Het commandovoorvoegsel van God werd gewijzigd in "${arguments[0]}".`);

    message.channel.send(stringEmbed);

}

module.exports.help = {
    name: "unk"
}