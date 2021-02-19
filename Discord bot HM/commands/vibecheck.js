const discord = require("discord.js");
const botConfig = require("../botconfig.json");

class user {
    constructor(bot, guild_member) {
        this.bot = bot;
        this.id = guild_member.id;
        this.isInCall = (guild_member.voice.channel) ? true : false;
        this.isInPopularCall = (guild_member.voice.channel && guild_member.voice.channel.members.array.length > 3) ? true : false;
        this.timeSinceMessage = (guild_member.lastMessage) ? Date.now() - guild_member.lastMessage.createdAt : 0
        this.black = ("792482767916367892" in guild_member.roles.cache.array) ? true : false // This is just a joke between friends.
    }
    get allUserData() {
        return [this.isInCall, this.isInPopularCall, this.timeSinceMessage, this.black]
    }
}

async function main(bot, interaction) {
    //console.log(bot.guilds.cache.get(interaction.guild_id).member(interaction.member.user.id));
    let member = new user(bot, bot.guilds.cache.get(interaction.guild_id).member(interaction.member.user.id));
    console.log(member.allUserData);
}

module.exports = { main }