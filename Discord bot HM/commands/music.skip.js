const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No songs playing.").then(message => message.delete(10000));

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("You're not in the right voice channel to do that!");

    var amountOfUsers = message.member.voiceChannel.members.size;

    var amountToSkip = Math.ceil(amountOfUsers / 2);

    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip! ${guildIDData.queue[0].voteSkips.length} out of ${amountToSkip} votes.`);

    guildIDData.queue[0].voteSkips.push(message.member.id);

    options.active.set(message.guild.id, guildIDData);
    
    if (guildIDData.queue[0].voteSkips.length >= amountToSkip){
        message.channel.send("Skipping this song...");
        
        return guildIDData.dispatcher.emit("end");
    }

    message.channel.send(`Added to skiplist. ${guildIDData.queue[0].voteSkips.length} out of ${amountToSkip} votes.`);

}

module.exports.help = {
    name: "skip"
}