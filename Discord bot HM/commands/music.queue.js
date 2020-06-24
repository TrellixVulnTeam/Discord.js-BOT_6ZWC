const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments, options) => {

    message.delete();

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No songs playing.").then(message => message.delete(10000));

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Now playing: ${nowPlaying.songTitle} - Requested by ${nowPlaying.requester} \n\nQueue: \n`
    
    for(var i = 0; i < queue.length; i++) {
        response += `${i} - ${queue[i].songTitle} - Requested by ${queue[i].requester}\n`;
    }
    
    message.channel.send(response);

}

module.exports.help = {
    name: "unk"
}