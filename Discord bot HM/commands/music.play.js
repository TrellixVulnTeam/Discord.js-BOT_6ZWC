const { play } = require("./music.backstage.play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");
const botConfig = require("../botconfig.json");
const fs = require("fs");

let YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID;
try {
const config = require("./music.backstage.play.config.json");
YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
SOUNDCLOUD_CLIENT_ID = config.SOUNDCLOUD_CLIENT_ID;
} catch (error) {
  YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
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

    /*const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
        return console.log("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
        return console.log("I cannot speak in this voice channel, make sure I have the proper permissions!");*/

    const search = arguments.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    //const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = arguments[0];
    const urlValid = videoPattern.test(arguments[0]);
    //console.log(`https://www.youtube.com/watch?v=rPAAoSFfFww == ${arguments[0]}:`, "https://www.youtube.com/watch?v=rPAAoSFfFww" ==arguments[0]);

    /*// Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
        return message.client.commands.get("playlist").execute(message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
        return message.client.commands.get("playlist").execute(message, args);
    }*/

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
        };
        } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
        }
    } else if (scRegex.test(url)) {
        try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
            title: trackInfo.title,
            url: trackInfo.permalink_url,
            duration: Math.ceil(trackInfo.duration / 1000)
        };
        } catch (error) {
        if (error.statusCode === 404)
            return message.reply("Could not find that Soundcloud track.").catch(console.error);
        return message.reply("There was an error playing that Soundcloud track.").catch(console.error);
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