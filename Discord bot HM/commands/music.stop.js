const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments) => {

    message.delete(100);

    if(!message.member.voiceChannel) return message.channel.send("You're not allowed to do that when you're not in a voice channel.").then(message => message.delete(5000));

    if(!message.guild.me.voiceChannel) return message.channel.send("I'm not playing music right now.").then(message => message.delete(3000));

    if(message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Please connect to the same voice channel in order to do that.").then(message => message.delete(5000));

    message.guild.me.voiceChannel.leave();

    message.channel.send("Channel left.").then(message => message.delete(3000));

}

module.exports.help = {
    name: "stop"
}