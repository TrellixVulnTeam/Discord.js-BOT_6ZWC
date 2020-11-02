const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments, options) => {

    message.delete();

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send("🚫 No music playing");
    //console.log(serverQueue.songs[0]["title"]);

    /*var queue = guildIDData.queue;
    var nowPlaying = queue[0];*/

    //var response = `Now playing: ${nowPlaying.songTitle} - Requested by ${nowPlaying.requester} \n\nQueue: \n`
    var response = `**Music queue:**\n`
    
    for(var i = 0; i < serverQueue.songs.length; i++) {
        //response += `${i} - ${queue[i].songTitle} - Requested by ${queue[i].requester}\n`;
        if (i < 11){
            decoder = {0: ":arrow_forward: ", 1: ":one: ", 2: ":two: ", 3: ":three: ", 4: ":four: ", 5: ":five: ", 6: ":six: ", 7: ":seven: ", 8: ":eight: ", 9: ":nine: ", 10: ":keycap_ten: "}
            response += decoder[i]
        } else {
            response += `${i}: `
        }
        response += `${serverQueue.songs[i]["title"]}`
    }
    
    message.channel.send(response);

}

module.exports.help = {
    name: "queue"
}