const discord = require("discord.js");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async (bot, message, arguments) => {

    //!kick @username "reason why"

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));


    if (!kickUser) return message.channel.send("De opgegeven gebruiker bestaat niet!");

    var reason = arguments.join(" ").slice(22);

    var kick = new discord.RichEmbed()
        .setDescription("GOD_bot.command.kick")
        .setColor("cfb53b")
        .addField("Banned user:", banUser)
        .addField("Banned by:", message.author)
        .addField("Reason:", reason);

    var kickChannel = message.guild.channels.find(x => x.name === "bot_to_owner");
    if (!kickChannel) return message.channel.send("Kan het kanaal niet vinden!");

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        console.log(message.member.hasPermission("KICK_MEMBERS"))
        kickChannel.send("Iemand dient een kick-verzok in:")
        kickChannel.send(kick)
        return message.channel.send("Er werd een kick-verzoek ingediend!");
    }
    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    console.log("Dit it!")
    
    return;



}

module.exports.help = {
    name: "kick"
}