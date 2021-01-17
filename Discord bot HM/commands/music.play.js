const { play } = require("./music.backstage.play");
const { Util } = require("discord.js")
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
var botConfig = require("../botconfig.json");
const fs = require("fs");
const { type } = require("os");

let YOUTUBE_API_KEY
try {
const config = require("./music.backstage.play.config.json");
YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
} catch (error) {
  YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

async function main(bot, interaction) {
    console.log(bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id));
    //const channel = interaction.member.voice.channel;
    const channel = bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).voice.channel;
    var arguments = [ "" ];
    var json = fs.readFileSync("./botconfig.json");
    var jsonfile = JSON.parse(json);
    //console.log(interaction.data.options[0].options[0].name)
    if (interaction.data.options[0].options && interaction.data.options[0].options[0].name == "url") {
        arguments[0] = interaction.data.options[0].options[0].value;
        urltype = "url";
    }
    else if (interaction.data.options[0].options && interaction.data.options[0].options[0].name == "number") {
        arguments[0] = jsonfile[interaction.data.options[0].options[0].value];
        urltype = "number"
    }
    else {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Please enter either a number or a url"
                }
            }
        })
    }

    const serverQueue = bot.queue.get(interaction.guild_id);
    //if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
    if (!channel) {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "You need to join a voice channel first!"
                }
            }
        }).catch(console.error);
        return
    }
    //if (serverQueue && channel !== message.guild.me.voice.channel)
        //return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);
    if (serverQueue && channel !== bot.guilds.cache.get(interaction.guild_id).me.voice.channel) {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `You must be in the same channel as ${bot.user}.`
                }
            }
        }).catch(console.error);
        return
    }

    const search = arguments.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const url = arguments[0];
    const urlValid = videoPattern.test(arguments[0]);
    console.log(url, urlValid)

    const queueConstruct = {
        textChannel: bot.channels.cache.get(interaction.channel_id),
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
            //return message.reply(error.message).catch(console.error);
            await bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: error.message
                    }
                }
            }).catch(console.error);
            return
        }
    } else {
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Not a valid URL."
                }
            }
        }).catch(console.error)
        return
    }
        //return message.reply("Not a valid URL").catch(console.log("Not a valid URL"))

    if (serverQueue) {
        serverQueue.songs.push(song);
        /*return serverQueue.textChannel
        .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
        .catch(console.error);*/
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `✅ **${song.title}** has been added to the queue by ${interaction.member}`
                }
            }
        }).catch(console.error)
    }

    queueConstruct.songs.push(song);
    bot.queue.set(interaction.guild_id, queueConstruct);

    try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], bot, interaction, urltype);
    } catch (error) {
        console.error(error);
        bot.queue.delete(interaction.guild_id);
        await channel.leave();
        //return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Could not join the channel: ${error}`
                }
            }
        }).catch(console.error)
        return
    }
};

module.exports = { main }