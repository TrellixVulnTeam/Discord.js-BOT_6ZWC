const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, arguments) => {

    const categoryid = "625776086730407946";

    if(message.channel.parentID == categoryid){

        message.channel.delete();

    }else{

        message.channel.send("This command can't be used inside this channel.").then(message => message.delete(10000));

    }

//    var embedCloseRequest = new discord.RichEmbed()
//        .setTitle("Hey " + channel.name)
//        .setDescription("The status of your case has been updated to: **CLOSED**")
//        .setFooter("Request case closed succesfully.")
//        .setColor("cfb53b");

//    var logChannel = message.guild.channels.find('name', "general");
//    if(!logChannel) return message.channel.send("Channel not found.");

 //   logChannel.send(embedCloseRequest);  //==> channel name not found, line 20

}

module.exports.help = {
    name: "close"
}