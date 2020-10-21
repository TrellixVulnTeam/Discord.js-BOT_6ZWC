const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, arguments) => {
    if (arguments != "") {
        message.reply(`Syntax Error: unused argument "${arguments}" was provided. Use ${botConfig.prefix}help when struggeling.`);
    };

    const categoryid = "625776086730407946";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var embedCreateFeedback = new discord.MessageEmbed()
        .setTitle("Hey " + userName + "!")
        .setFooter("Your case is being opened... Please wait.")
        .setColor("#cfb53b");

    message.channel.send(embedCreateFeedback);

    message.guild.channels.create(userName + "-" + userDiscriminator, "text").then((createdChannel) => {
        createdChannel.setParent(categoryid).then((chosenParent) => {
            chosenParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), {
                "VIEW_CHANNEL": false
            });

            chosenParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "BOT"), {
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "SEND_MESSAGES": true,
                "CONNECT": true,
                "ADD_REACTIONS": true
            });

            chosenParent.updateOverwrite(message.author, {
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "SEND_MESSAGES": true,
                "ATACH_FILES": true,
                "CONNECT": true,
                "CREATE_INSTANT_INVITE": false,
                "ADD_REACTIONS": true
            });

            var embedEnter = new discord.MessageEmbed()
                .setTitle("Hey " + userName)
                .setDescription("Your case has been opened. Please submit your problem, suggestion or report.")
                .setFooter("The channel was succesfully created.")
                .setColor("#cfb53b");
            chosenParent.send(embedEnter);

        }).catch(err => {
            console.log(err)
            message.channel.send("Fatal Error #c0f2op1")
        });

    }).catch(err => {
        console.log(err)
        message.channel.send("Fatal Error #c0f2op2")
    });

}

module.exports.help = {
    name: "feedback"
}