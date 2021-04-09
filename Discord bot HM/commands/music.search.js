const fs = require("fs")
const yts = require("yt-search")
const discord = require("discord.js");
const botConfig = require("../botconfig.json")

async function main(bot, interaction) {
    //console.log("hi");
    arguments = [ "" ];
    arguments[0] = interaction.data.options[0].options[0].value;
    //if(!arguments[0]) return message.reply(`Syntax Error: 1+ arguments wer expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    if (!arguments[0]) {
        console.error("Non-optional value 'title' was not given.");
    }
    toSearch = arguments.join(" ");
    const r = await yts(toSearch);
    const videos = r.videos.slice(0, 5);
    var jsoncount = 1;
    var jsonfile = JSON.parse(fs.readFileSync("./botconfig.json").toString());
    var guild_id = interaction.guild_id;
    var channel_id = interaction.channel_id;
    await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
        }
    })
    var count = 0
    await videos.forEach(function (v) {
        const views = String(v.views).padStart(10, " ");
        //message.reply(`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`).then(message => message.delete({timeout: 20000}));
        console.log(count);
        if (count == 0) {
            if (`${jsoncount} | ${v.title}`.length > 99) {
                bot.api.webhooks(bot.user.id, interaction.token).messages("@original").patch({
                    data: {
                        content: `${jsoncount} | (title too long)`
                    }
                })
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = "(title too long)";
            } else if (`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`.length > 99) {
                bot.api.webhooks(bot.user.id, interaction.token).messages("@original").patch({
                    data: {
                        content: `${jsoncount} | ${v.title}`
                    }
                })
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = v.title;
            } else {
                bot.api.webhooks(bot.user.id, interaction.token).messages("@original").patch({
                    data: {
                        content: `${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`
                    }
                })
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = v.title;
            }
        }
        if (count > 0) {
            if (`${jsoncount} | ${v.title}`.length > 99) {
                bot.guilds.cache.get(guild_id).channels.cache.get(channel_id).send(`${jsoncount} | (title too long)`);
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = "(title too long)";
            } else if (`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`.length > 99) {
                bot.guilds.cache.get(guild_id).channels.cache.get(channel_id).send(`${jsoncount} | ${v.title}`);
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = v.title;
            } else {
                bot.guilds.cache.get(guild_id).channels.cache.get(channel_id).send(`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`);
                jsoncount++;
                jsoncountstr = String(jsoncount-1);
                jsoncountstr2 = String(jsoncount-1) + "_name";
                jsonfile[jsoncountstr] = v.url;
                jsonfile[jsoncountstr2] = v.title;
            }
            /*bot.guilds.cache.get(guild_id).channels.cache.get(channel_id).send(`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`);*/
        }
        count++;
        /*jsoncount++;
        jsoncountstr = String(jsoncount-1);
        jsoncountstr2 = String(jsoncount-1) + "_name";
        jsonfile[jsoncountstr] = v.url;
        jsonfile[jsoncountstr2] = v.title;
        count = count + 1;*/
    })
    console.log(jsonfile);
    await fs.writeFile("./botconfig.json", JSON.stringify(jsonfile), function(err, result) {
        if (err) console.log(err);
    });
    var array = await bot.api.applications(bot.user.id).guilds("585896430380777503").commands.get();
    console.log("Array: ------", array)
    array.forEach(element => {
        //console.log(element);
        if (element.name == "music") {
            console.log("music found")
            bot.api.applications(bot.user.id).guilds("585896430380777503").commands(element.id).patch({
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
                                            name: `1 | ${jsonfile["1_name"]}`,
                                            value: 1
                                        },
                                        {
                                            name: `2️ | ${jsonfile["2_name"]}`,
                                            value: 2
                                        },
                                        {
                                            name: `3️ | ${jsonfile["3_name"]}`,
                                            value: 3
                                        },
                                        {
                                            name: `4️ | ${jsonfile["4_name"]}`,
                                            value: 4
                                        },
                                        {
                                            name: `5 | ${jsonfile["5_name"]}`,
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
            }).catch(console.error);
        }
    });

}

module.exports = { main }