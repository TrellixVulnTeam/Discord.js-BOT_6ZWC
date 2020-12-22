const { play } = require("./music.backstage.play");
const { Util } = require("discord.js")
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const botConfig = require("../botconfig.json");
const fs = require("fs");

let YOUTUBE_API_KEY
try {
const config = require("./music.backstage.play.config.json");
YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
} catch (error) {
  YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports.run = async (bot, message, arguments) => {
    const channel = message.member.voice.channel;
    
    if (!isNaN(arguments[0])) {
        index = Number(arguments[0])
        var jsonfile = JSON.parse(fs.readFileSync("./botconfig.json").toString());
        arguments[0] = jsonfile[index]
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
        return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);

    if (!arguments.length)
        return message
        .reply(`No arguments given.`)
        .catch(console.error);

    const search = arguments.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const url = arguments[0];
    const urlValid = videoPattern.test(arguments[0]);

    const queueConstruct = {
        textChannel: message.channel,
        channel,
        connection: null,
        songs: [],
        loop: false,
        volume: 100,
        playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
        try {
            console.log(url);
            songInfo = await ytdl.getInfo(url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds
            }
        } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
    } else return message.reply("Not a valid URL").catch(console.log("Not a valid URL"))

    if (serverQueue) {
        serverQueue.songs.push(song);
        return serverQueue.textChannel
        .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
    } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
    }
};

module.exports.help = {
    name: "play"
}