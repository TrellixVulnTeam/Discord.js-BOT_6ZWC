const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments) => {

    const categoryid = "625776086730407946";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

//    var bool = false;

    //next commentary lines check to only have one request running per user. (incl. line 12)
//    message.guild.channels.forEach((channel) => {

//        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){

//            message.chanel.send("You already have a running request.");

//            bool = true;

//        }

//    });

//    if(bool == true) return;

    var embedCreateRequest = new discord.RichEmbed()
        .setTitle("Hey " + userName + "!")
        .setFooter("Case is being opened... Please wait.")
        .setColor("#cfb53b");

    message.channel.send(embedCreateRequest);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChannel) => {

        createdChannel.setParent(categoryid).then((chosenParent) => {

            chosenParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), {"READ_MESSAGES": false });

            chosenParent.overwritePermissions(message.guild.roles.find('name', "BOT"), {
                "READ_MESSAGES": true,
                "SEND_MESSAGES": true,
                "CONNECT": true,
                "ADD_REACTIONS": true
            });

            chosenParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true,
                "SEND_MSSAGES": true,
                "ATACH_FILES": true,
                "CONNECT": true,
                "CREATE_INSTANT_INVITE": false,
                "ADD_REACTIONS": true

            });

            var embedEnter = new discord.RichEmbed()
                .setTitle("Hey " + userName)
                .setDescription("Your case has been opened. Please explain your problem or suggestion.")
                .setFooter("The chanel was succesfully created.")
                .setColor("#cfb53b");
            chosenParent.send(embedEnter);

        }).catch(err => {
            message.channel.send("Something went wrong... The problem will be fixed ASAP.")
        });

    }).catch(err => {
        message.channel.send("Something exploded. Just kidding, got an error, will be fixed ASAP.")
    });

}

module.exports.help = {
    name: "unk"
}