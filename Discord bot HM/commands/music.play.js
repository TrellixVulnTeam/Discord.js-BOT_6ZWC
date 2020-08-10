require("ffmpeg-static")
const ytdl = require("ytdl-core");
const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments, options) => {
    if(!message.member.voice.channel) return message.reply("You are not connected to a voice channel.").then(message => message.delete({timeout: 3000}));
    if(message.guild.me.voice.channel) return message.reply("Already connected to a voice channel.").then(message => message.delete({timeout: 3000}));
    if(!arguments[0]) return message.reply(`Syntax Error: 1 argument was expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    if(arguments[1]) return message.reply(`Syntax Error: 1 argument was expected, 2+ were given: ${arguments}. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));

    var validate = await ytdl.validateURL(arguments[0]);
    if(!validate) return (`Excecution Error: the url provided does not exist. Use ${botConfig.prefix}help when struggeling.`);

    var info = await ytdl.getInfo(arguments[0]);
    var data = options.active.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;
    data.queue.push({
        songTitle: info.videoDetails.title,
        requester: message.author.tag,
        url: arguments[0],
        announcementChannel: message.channel.id
    });
    if(!data.dispatcher){
        Play(bot, options, data);
    } else{
        message.channel.send(`Added ${info.title} to the queue - Requested by ${message.author.tag}`).then(message => message.delete({timeout: 3000}));
    }

    options.active.set(message.guild.id, data);
    var options = {seek: 0, volume: 1};

//    var voiceConnection = message.member.voiceChannel.join()
//    .then(voiceChannel => {
//        var stream = ytdl(arguments[0], {filter: "audioonly"});
//        var streamDispatch = voiceChannel.playStream(stream, options);
//    })
//    .catch(console.error);

//    message.channel.send(`Now playing: ${info.title}`);
    
}

async function Play(bot, options, data){
    bot.channels.cache.get(data.queue[0].announcementChannel).send(`Now playing: ${data.queue[0].songTitle} - Requested by ${data.queue[0].requester}`).then(message => message.delete({timeout: 3000}));
    var ops = {seek: 3, volume: 1, bitrate: 12800};
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: "audioonly"}), ops);
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once("end", function() {
        Finish(bot, options, this);
    })
}

function Finish(bot, options, dispatcher) {
    var fetchedData = options.active.get(dispatcher.guildID);
    fetchedData.queue.shift();
    if (fetchedData.queue.length > 0) {
        options.active.set(dispatcher.guildID, fetchedData);
        Play(bot, options, fetchedData);
    } else {
        options.active.delete(dispatcher.guildID);
        var voiceChannel = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (voiceChannel) voiceChannel.leave();
    }
}

module.exports.help = {
    name: "play"
}