const discord = require("discord.js");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async (bot, message, arguments) => {
    
    message.delete(0);

    //!ban @username "reason why"

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!banUser) return message.channel.send("De opgegeven gebruiker bestaat niet!");

    var reason = arguments.join(" ").slice(22);

    var ban = new discord.RichEmbed()
        .setDescription("GOD_bot.command.ban")
        .setColor("cfb53b")
        .addField("Banned user:", banUser)
        .addField("Banned by:", message.author)
        .addField("Reason:", reason);

    var banChannel = message.guild.channels.find(x => x.name === "bot_to_owner");
    if (!banChannel) return message.channel.send("Kan het kanaal niet vinden!").then(message => message.delete(10000));

    if (!message.member.hasPermission("BAN_MEMBERS")) {
//        console.log(message.member.hasPermission("BAN_MEMBERS"))
        banChannel.send("Iemand dient een ban-verzok in!")
        banChannel.send(ban)
        return message.channel.send("Er werd een ban-verzoek ingediend!").then(message => message.delete(10000));
    }
    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);

//    console.log("Dit it!")

    return;



}

module.exports.help = {
    name: "unk"
}