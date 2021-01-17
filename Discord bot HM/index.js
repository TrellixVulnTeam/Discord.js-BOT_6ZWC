const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const { commands } = require("npm");
console.log("logging in");


const bot = new discord.Client();
bot.commands = new discord.Collection();

/*fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("didn't find any files");
        return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} was loaded`);
        console.log(fileGet)
        botcommands.push({
            key: f,
            value: fileGet
        })
    })
    console.log(bot.commands)

});*/

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.queue = new Map();
    
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "ping",
            description: "Get the connection delay between you and GOD."
        }
    })
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
    })
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "clear",
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
    })
    bot.api.applications(bot.user.id).guilds("585896430380777503").commands.post({
        data: {
            name: "shutdown",
            description: "Shutdown the bot user."
        }
    })
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
                            type: 3,
                            name: "URL",
                            description: "Enter the YouTube video url."
                        },
                        {
                            type: 4,
                            name: "Number",
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
    })
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    if (interaction.data.name == "ping") {
        const ping = require("./commands/ping.js");
        await ping.main(bot, interaction);
    } else if (interaction.data.name == "echo") {
        const echo = require("./commands/echo.js");
        await echo.main(bot, interaction);
    } else if (interaction.data.name == "clear") {
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
    }
    //console.log(interaction.data.name);
})

/* bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    if(message.content.includes("unk")) {
        message.reply("The word \"unk\" is temporarily banned whilst GOD is online.");
        message.delete();
        return;
    }

    *//*var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));


    if (!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
             prefixes: botConfig.prefix
        };
        fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
        });
    }

    var prefix = prefixes[message.guild.id].prefixes;*//*
    var prefix = String(botConfig.prefix);
    if (!message.content.startsWith(prefix)) return


    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);
    var commands = bot.commands.get(command.slice(prefix.length));
    var options = {active: active};

    if (commands) {
        commands.run(bot, message, arguments, options);
    }
    console.log(command, arguments);
    if (command === `${botConfig.prefix}shutdown`) {
        clearInterval(scrollStatusInterval);
        bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft ");
        bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C ");
        bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S ");
        bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden A")).setName("Heilige Maagden A ");
        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online ");
        bot.channels.cache.find(channel => channel.name.startsWith("Rainbow Six Siege")).setName("Rainbow Six Siege ");
        bot.user.setActivity("");
        bot.user.setStatus("invisible");

        if (arguments[0] === "-r") {
            bot.destroy();
            bot.login(botConfig.token).catch();
        } else {
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft ");}, 400);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C ");}, 5000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S ");}, 6000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden A")).setName("Heilige Maagden A ");}, 6000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online ");}, 7000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Rainbow Six Siege")).setName("Rainbow Six Siege ");}, 7000);
            setTimeout(() => {bot.user.setActivity("");}, 5000);
            setTimeout(() => {bot.user.setStatus("invisible");}, 5000);
            console.log("destroying");
            sleep(10000);
            console.log("Now save to quit. press ^C.");
        }
    }

}); */

bot.login(botConfig.token).catch(console.error);
