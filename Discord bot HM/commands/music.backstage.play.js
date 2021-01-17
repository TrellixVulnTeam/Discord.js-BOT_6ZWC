const ytdlDiscord = require("ytdl-core-discord");
const ytdl = require('ytdl-core');
const { canModifyQueue } = require("./music.backstage.play.util");
const { Util } = require("discord.js");
const fs = require("fs");
const { error } = require("console");

module.exports = {
  async play(song, bot, interaction, urltype) {
    try {
      const config = require("./music.backstage.play.config.json");
      PRUNING = config.PRUNING;
    } catch (error) {
      PRUNING = process.env.PRUNING;
    }
    const queue = bot.queue.get(interaction.guild_id);

    try {
      await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 5
        }
      })
      if (urltype == "url") var playingMessage = await queue.textChannel.send(`🎶 Started playing: **${song.title}**`);
      else if (urltype == "number") var playingMessage = await queue.textChannel.send(`🎶 Started playing: **${song.title}**\n${song.url}`);
    } catch {
      console.log(error);
    }

    if (!song) {
      queue.channel.leave();
      bot.queue.delete(interaction.guild_id);
      return queue.textChannel.send("🚫 Music queue ended.").catch(console.error);
      /*bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "🚫 Music queue ended."
          }
        }
      })
      return*/
    }

    console.log(song)
    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    queue.connection.on("disconnect", () => bot.queue.delete(interaction.guild_id));

    const dispatcher = queue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();
        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          urltype = "number"
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], bot, interaction, urltype);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], bot, interaction, urltype);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], bot, interaction, urltype);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    const member = await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id);

    try {
      await playingMessage.react("⏹");
      await playingMessage.react("⏯");
      await playingMessage.react("⏭");
      await playingMessage.react("🔁");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== bot.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      //const member = bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id);

      switch (reaction.emoji.name) {
        case "⏭":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          queue.textChannel.send(`⏩ ${user} skipped the song`).catch(console.error);
          collector.stop();
          break;

        case "⏯":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            queue.textChannel.send(`⏸ ${user} paused the music.`).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            queue.textChannel.send(`:arrow_forward: ${user} resumed the music!`).catch(console.error);
          }
          break;

        case "🔁":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          queue.textChannel.send(`🔁 ${user} turned loop mode ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);
          break;

        case "⏹":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          queue.textChannel.send(`⏹ ${user} stopped the music!`).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};

module.exports.help = {
    name: "unk"
}