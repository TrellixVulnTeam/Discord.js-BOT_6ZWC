// Unfinished

const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You are not able to run this command with your current permissions. For more info, check ${botConfig.prefix}help.`).then(message => message.delete({timeout: 3000}));
    if (!arguments[0]) return message.reply(`Syntax Error: 1+ arguments where expected, none were given. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    
    var title = ""
    var color = ""
    var author = ""
    var authorAvatar = ""
    var footer = ""
    
    argumentsString = arguments.join(" ");
    argumentsSplitted = argumentsString.split("-");
    argumentsSplitted = argumentsSplitted.map(argument => argument.trim());
    argumentsSplitted.shift();
    argumentsSplitted.forEach(argument => {
        argumentArray = argument.split(" ");
        if (argumentArray[0] == "t") {
            if (title === "") {
                argumentArray.shift();
                title = argumentArray.join(" ");
            } else return message.reply(`Syntax Error: The title argument "-t" was found twice, but is only accepted once. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
        } else if (argumentArray[0] == "c") {
            if (color === "") {
                if (argumentArray[2]) return message.reply(`Syntax Error: The color argument "-c" was given more than one appendix, but only acceptes one. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
                else color = argumentArray[1];
            } else return message.reply(`Syntax Error: The color argument "-c" was found twice, but is only accepted once. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
        } else if (argumentArray[0] == "an") {
            if (author === "") {
                argumentArray.shift();
                author = argumentArray.join(" ")
            } else return message.reply(`Syntax Error: The author name argument "-an" was found twice, but is only accepted once. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
        } else if (argumentArray[0] == "aa") {
            if (authorAvatar === "") {
                if (argumentArray[2]) return message.reply(`Syntax Error: The author avatar argument "-aa" was given more than one appendix, but only acceptes one. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
                if (argumentArray[1].startsWith("http")) {
                    argumentArray.shift();
                    authorAvatar = argumentArray.join("-")
                } else if (argumentArray[1].startsWith("u")) authorAvatar = message.guild.members.resolve(argumentArray[1].replace("u", "")).user.avatarURL();
            } else return message.reply(`Syntax Error: The author avatar argument "-aa" was found twice, but is only accepted once. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
        } else if (argumentArray[0] == "f") {
            if (footer === "") {
                argumentArray.shift();
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                argumentArray.push(mm + '/' + dd + '/' + yyyy);
                footer = argumentArray.join(" ")
            } else return message.reply(`Syntax Error: The footer argument "-f" was found twice, but is only accepted once. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
        }
    });
    if (title === "") return message.reply(`Syntax Error: The title argument "-t" was not found. Use ${botConfig.prefix}help when struggeling.`).then(message => message.delete({timeout: 3000}));
    if (color === "") color = "#cfb53b";
    if (author === "") {author = message.member.user.tag; authorAvatar = message.member.user.avatarURL}
    if (authorAvatar === "") authorAvatar = "https://i.dlpng.com/static/png/6757047_preview.png"
    if (footer === "") footer = author
    embed = new discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setAuthor(author, authorAvatar)
        .addField("Source:", footer, false)
    message.channel.send(embed);
}

module.exports.help = {
    name: "announce"
}