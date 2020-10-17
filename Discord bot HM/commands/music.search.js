const fs = require("fs")
const yts = require("yt-search")
const discord = require("discord.js");
const botConfig = require("../botconfig.json")

module.exports.run = async (bot, message, arguments) => {
    if(!arguments[0]) return message.reply(`Syntax Error: 1+ arguments wer expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    toSearch = arguments.join(" ");
    const r = await yts(toSearch);
    const videos = r.videos.slice(0, 5);
    var jsoncount = 1;
    var jsonfile = JSON.parse(fs.readFileSync("./botconfig.json").toString());
    videos.forEach(function (v) {
        const views = String(v.views).padStart(10, " ");
        message.reply(`${jsoncount} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${views}`).then(message => message.delete({timeout: 20000}));
        jsoncount++;
        jsoncountstr = String(jsoncount-1);
        jsonfile[jsoncountstr] = v.url;
    })
    console.log(jsonfile);
    fs.writeFile("./botconfig.json", JSON.stringify(jsonfile), function(err, result) {
        if (err) console.log(err);
    });
}

module.exports.help = {
    name: "search"
}