const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix


module.exports.run = async (bot, message, arguments) => {
  //  console.log(arguments.join(" "))
    message.delete(0)

    if (arguments.join(" ") === "") {

        try {

            var text = `**__GOD - help__** \n\n **Commands** \n ${botConfig.prefix}ban [@persoon] [reden] - Verban iemand \n ${botConfig.prefix}botinfo - Krijg info over GOD \n ${botConfig.prefix}echo [bericht] - Laat GOD iets herhalen \n ${botConfig.prefix}help {commando} - Toon dit bericht, of een spcifieke uitleg over een commando \n ${botConfig.prefix}kick [@persoon] - Kick iemand van de server \n ${botConfig.prefix}serverinfo - Krijg info over de Heilige Maagden discord server`;

            var text = new discord.RichEmbed()
                .setTitle(`**__GOD - help__**`, true)
                .setDescription(`The help command got launched.`)
                .addField("**BAN**", `${botConfig.prefix}` + "ban [@person] [reason] \nBan someone.", true)
                .addBlankField(false)
                .addField("**BOTINFO**", `\t${botConfig.prefix}` + "botinfo \n\tRequest server information.", true)
                .addBlankField(false)
                .addField("**CLEAR**", `\t${botConfig.prefix}` + "clear [amount]\n\tDelete the x last messages.", true)
                .addBlankField(false)
                .addField("**CLOSEREQUEST**", `\t${botConfig.prefix}` + "close\n\tDelete a request channel.", true)
                .addBlankField(false)
                .addField("**ECHO**", `\t${botConfig.prefix}`+ "echo [message]\n\tLet me repeat you.", true)
                .addBlankField(false)
                .addField("**HELP**\n--> Explenation comming soon...", true)
                .addBlankField(false)
                .addField("**KICK**", true)
                .setColor("cfb53b")

            message.author.send(text);

        } catch (error) {
            message.channel.send(`Something went wrong... Sorry!\n[ERROR]: ${error}`);
            console.log(`Error in help: ${error}`);
        }
    }

    if(arguments.join(" ") === "ban"){

        var text = `**GOD - help** \n\n U vroeg de handleiding van het **${prefix}${arguments.join(" ")}** commando.\n\n__Gebruik:__\nHet ${prefix}${arguments.join(" ")} commando wordt gebruikt voor het verbannen van een persoon van de Heilige Maagden discord server. Indien de persoon die het commando uitvoert binnen discord de rechten heeft om personen te verbannen, zal God het commando gewoon uitvoeren, en de persoon verbannen. Wanneer het bevel gegeven wordt door een persoon zonder verbanrechten binnen discord, zal God een verban-verzoek sturen naar de Owner/Back-Up Owner(s). Deze zullen dan al dan niet de speler verbannen.\n\n__In-code-name:__\n\${prefix}\${arguments.join(" ")} = \${prefix}ban\t(by default !ban)`;

        message.author.send(text);

    }

    //message.channel.send("You got a DM with the asked information.").delete(5000);

}

module.exports.help = {
    name: "help"
}