const ytdl = require("ytdl-core");
const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments, options) => {

    message.delete(100);

    if(!message.member.voiceChannel) return message.channel.send("You are not connected to a voice channel.").then(message => message.delete(3000));

//    if(message.guild.me.voiceChannel) return message.channel.send("I'm already acting-like-a-dj on a channel. Can't do 1000 things at a time...");

    if(!arguments[0]) return message.channel.send(`No arguments were given, 1 was expected. please use ${botConfig.prefix}play [song-URL]`).then(message => message.delete(3000));

    var validate = await ytdl.validateURL(arguments[0]);

    if(!validate) return ("Unvalide URL was given in arguments[0] of music.play.js command.");

    var info = await ytdl.getInfo(arguments[0]);

    var data = options.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();

    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: arguments[0],
        announcementChannel: message.channel.id
    });

    if(!data.dispatcher){
        Play(bot, options, data);
    } else{
        message.channel.send(`Added ${info.title} to the queue - Requested by ${message.author.tag}`).then(message => message.delete(5000));
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
    bot.channels.get(data.queue[0].announcementChannel).send(`Now playing: ${data.queue[0].songTitle} - Requested by ${data.queue[0].requester}`).then(message => message.delete(5000));
    bot.user.setActivity(data.queue[0].songTitle, { type: "PLAYING" });

    var ops = {seek: 3, volume: 1, bitrate: 12800};

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly"}), ops);
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once("end", function() {
        Finish(bot, options, this);
    })
}

function Finish(bot, options, dispatcher) {
    var fetchedData = options.active.get(dispatcher.guildID);
    fetchedData.queue.shift();

    if(fetchedData.queue.length > 0){
        options.active.set(dispatcher.guildID, fetchedData);
        Play(bot, options, fetchedData);
    }else{
        options.active.delete(dispatcher.guildID);

        var voiceChannel = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

        if(voiceChannel) voiceChannel.leave();

        bot.user.setActivity("Hentai", { type: "WATCHING" });
    }
}

module.exports.help = {
    name: "play"
}