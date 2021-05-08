const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const { commands } = require("npm");
const { debug } = require("console");
console.log("[app] Logging in");


const bot = new discord.Client();
bot.commands = new discord.Collection();

const debugMode = botConfig.debugMode;
if (debugMode) console.log("[app - debug] Launching debug mode")

bot.on("ready", async () => {
    console.log(`[app] ${bot.user.username} is online!`);
    bot.queue = new Map();

    var voicechannels = [];
    bot.guilds.cache.get("585896430380777503").channels.cache.array().forEach(async function (channel) {
        if (channel.type == "voice") {
            voicechannels.push({
                name: channel.name,
                value: channel.id
            });
        }
    })
    
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "ping",
            description: "Get the connection delay between you and GOD."
        }
    }).then(console.log("[app] Command ping posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "echo",
            description: "Make GOD say a message in the #general text channel.",
            options: [
                {
                    type: 3,
                    required: true,
                    name: "message",
                    description: "The message GOD should repeat."
                }
            ]
        }
    }).then(console.log("[app] Command echo posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "monkey-clean",
            description: "Clear a number of recent messages from a text channel.",
            options: [
                {
                    type: 4,
                    required: true,
                    name: "amount",
                    description: "The amount of messages to delete."
                },
                {
                    type: 3,
                    required: false,
                    name: "channel_id",
                    description: "The id of the channel in which you want to delete messages."
                }
            ]
        }
    }).then("[app] Command clear posted")
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "shutdown",
            description: "Shutdown the bot user."
        }
    }).then(console.log("[app] Command shutdown posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "music",
            description: "The built-in discord music player.",
            options: [
                {
                    type: 1,
                    name: "play",
                    description: "Make the bot play a song in a voice channel.",
                    options: [
                        {
                            name: "url",
                            type: 3,
                            description: "Enter the YouTube video url."
                        },
                        {
                            type: 4,
                            name: "number",
                            description: "The number of the song given by the `/music search` command.",
                            choices: [
                                {
                                    name: `1 | ${botConfig["1_name"]}`,
                                    value: 1
                                },
                                {
                                    name: `2️ | ${botConfig["2_name"]}`,
                                    value: 2
                                },
                                {
                                    name: `3️ | ${botConfig["3_name"]}`,
                                    value: 3
                                },
                                {
                                    name: `4️ | ${botConfig["4_name"]}`,
                                    value: 4
                                },
                                {
                                    name: `5 | ${botConfig["5_name"]}`,
                                    value: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 1,
                    name: "search",
                    description: "Search for a song to play on youtube.",
                    options: [
                        {
                            type: 3,
                            required: true,
                            name: "title",
                            description: "Enter keywords related to the song in order to find it."
                        }
                    ]
                }/*,
                {
                    type: 1,
                    name: "share",
                    description: "Share a song to the server."
                }*/
            ]
        }
    }).then(console.log("[app] Command music posted"))
    bot.api.applications(bot.user.id).guilds("675043823511928881").commands.post({
        data: {
            name: "vibecheck",
            description: "Vibe check a member of this server.",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "The user to be vibe checked.",
                    required: true
                }
            ]
        }
    }).then(console.log("[app] Command vibecheck posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "voice",
            description: "Voice channel options.",
            options: [
                {
                    type: 1,
                    name: "move",
                    description: "Move all users in a channel to a different channel.",
                    options: [
                        {
                            type: 3,
                            name: "destination_channel",
                            description: "The channel to move to.",
                            choices: voicechannels,
                            required: true
                        },
                        {
                            type: 3,
                            name: "current_channel",
                            description: "The channel to move from.",
                            choices: voicechannels,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "mute",
                    description: "Mute all users in a channel.",
                    options: [
                        {
                            type: 3,
                            name: "channel",
                            description: "The channel in which to mute everyone.",
                            choices: voicechannels,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "unmute",
                    description: "Unmute all users in a channel.",
                    options: [
                        {
                            type: 3,
                            name: "channel",
                            description: "The channel in which to unmute everyone.",
                            choises: voicechannels,
                            required: false
                        }
                    ]
                }
            ]
        }
    }).then(console.log("[app] Command voice posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "invite",
            description: "Create an invite link to this server.",
            options: [
                {
                    type: 5,
                    name: "permanency",
                    description: "Choose whether to create a temporary or a permanent invite.",
                    required: true
                }
            ]
        }
    }).then(console.log("[app] Command invite posted"))
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "f1-vote",
            description: "Send the DOTD and GOTD messages for people to vote on."
        }
    }).then(console.log("[app] Command f1-vote posted"))
});

console.log("debug 0");
bot.ws.on('INTERACTION_CREATE', async interaction => {
//bot.on('INTERACTION_CREATE', async interaction => {
    // DEBUG LOG:
    console.log("debug 1");
    if (debugMode) console.log("[app] INTERACTION RECEIVED:\n", interaction);
    if (interaction.data.name == "ping") {
        const ping = require("./commands/ping.js");
        await ping.main(bot, interaction);
    } else if (interaction.data.name == "echo") {
        const echo = require("./commands/echo.js");
        await echo.main(bot, interaction);
    } else if (interaction.data.name == "monkey-clean") {
        const clear = require("./commands/clear.js");
        await clear.main(bot, interaction);
    } else if (interaction.data.name == "shutdown") {
        const shutdown = require("./commands/shutdown.js");
        await shutdown.main(bot, interaction);
    } else if (interaction.data.name == "shutdown") {
        console.log(options)
    } else if (interaction.data.name == "music") {
        console.log(interaction, "----", interaction.data.options[0].name);
        if (interaction.data.options[0].name == "play") {
            const play = require("./commands/music.play.js");
            await play.main(bot, interaction);
        } else if (interaction.data.options[0].name == "search") {
            const search = require("./commands/music.search.js");
            await search.main(bot, interaction);
        }
    } else if (interaction.data.name == "vibecheck") {
        const vibecheck = require("./commands/vibecheck.js");
        await vibecheck.main(bot, interaction);
    } else if (interaction.data.name == "voice") {
        console.log(interaction.data.options, "----", interaction.data.options[0].name);
        if (interaction.data.options[0].name == "move") {
            const move = require("./commands/move.js");
            await move.main(bot, interaction);
        } else if (interaction.data.options[0].name == "mute") {
            const mute = require("./commands/mute.js");
            await mute.main(bot, interaction);
        } else if (interaction.data.options[0].name == "unmute") {
            const unmute = require("./commands/unmute.js");
            await unmute.main(bot, interaction);
        }
    } else if (interaction.data.name == "invite") {
        const invite = require("./commands/invite.js");
        await invite.main(bot, interaction);
    } else if (interaction.data.name == "f1-vote") {
        const f1vote = require("./commands/f1.vote.js");
        await f1vote.main(bot, interaction);
    }
    console.log("debug 2");
        //console.log(interaction.data.name);
})

bot.login(botConfig.token).catch(console.error);
console.log("logged in");