require("ffmpeg-static")
const fs = require("fs")
const ytdl = require("ytdl-core");
const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments, options) => {
    if(!message.member.voice.channel) return message.reply("You are not connected to a voice channel.").then(message => message.delete({timeout: 3000}));
    if((message.guild.me.voice.channel != message.member.voice.channel) && (message.guild.me.voice.channel)) return message.reply("Already connected to a voice channel.").then(message => message.delete({timeout: 3000}));
    if(!arguments[0]) return message.reply(`Syntax Error: 1 argument was expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    if(arguments[1]) return message.reply(`Syntax Error: 1 argument was expected, 2+ were given: ${arguments}. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));

    if (!isNaN(arguments[0])) {
        index = Number(arguments[0])
        var jsonfile = JSON.parse(fs.readFileSync("./botconfig.json").toString());
        arguments[0] = jsonfile[index]
        console.log(arguments[0])
    }

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
    const serv = message.guild
    message.delete();
    if(!data.dispatcher){
        Play(bot, options, data, serv);
    } else{
        message.channel.send(`Added ${info.videoDetails.title} to the queue - Requested by ${message.author.tag}`).then(message => message.delete({timeout: 3000}));
    }

    options.active.set(message.guild.id, data);
    var options = {seek: 0, volume: 1};
    
}

async function Play(bot, options, data, serv){
    bot.channels.cache.get(data.queue[0].announcementChannel).send(`Now playing: ${data.queue[0].songTitle} - Requested by ${data.queue[0].requester}`).then(message => message.delete({timeout: 3000}));
    var ops = {seek: 0, volume: 1, bitrate: 512000};
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {highWaterMark: (1024 * 1024 * 10), quality: 'highestaudio', filter: "audioonly"}), ops);
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once("finish", function() {
        Finish(bot, options, this, serv);
    })
}

function Finish(bot, options, dispatcher, serv) {
    var fetchedData = options.active.get(dispatcher.guildID);
    fetchedData.queue.shift();
    if (fetchedData.queue.length > 0) {
        options.active.set(dispatcher.guildID, fetchedData);
        Play(bot, options, fetchedData);
    } else {
        options.active.delete(dispatcher.guildID);
        serv.me.voice.channel.leave();
    }
}

module.exports.help = {
    name: "play"
}