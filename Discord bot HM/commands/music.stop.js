const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments) => {
    if(!message.member.voice.channel) return message.channel.send("You're not allowed to do that when you're not in a voice channel.").then(message => message.delete(5000));
    if(!message.guild.me.voice.channel) return message.channel.send("I'm not playing music right now.").then(message => message.delete(3000));
    if(message.guild.me.voice.channel != message.member.voice.channel) return message.channel.send("Please connect to the same voice channel in order to do that.").then(message => message.delete(5000));
    
    message.guild.me.voice.channel.leave();
    message.delete();
}

module.exports.help = {
    name: "stop"
}