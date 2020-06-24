const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const {Builder, By, Key, until} = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const active = new Map();

var serverid = "585896430380777503";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var scrollCount = 1;
var nextActivity = "me launch...";
var nextActivityType = "WATCHING";

function scrollStatus() {
    bot.user.setActivity(nextActivity, {type: nextActivityType});
    if (scrollCount == 1) {
        var mcIP = "server.heiligemaagden.com";
        var url = "https://api.mcsrvstat.us/2/" + mcIP;

        request(url, {cache: 'no-store'}, function(err, responce, body){
            if (err) {
                console.log(err);
            }
            body = JSON.parse(body);
            if (body.online == true) {
                var maxplayers = body.players.max;
                if (body.players.online >= 1) {
                    var players = body.players.online;
                    nextActivity = `HMS: ${players} out of ${maxplayers}`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S 🟢");
                } else if (body.players.online < 1) {
                    var players = 0;
                    nextActivity = `HMS: nobody`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S 🟢");
                }
            } else if(body.online == false){
                nextActivity = `HMS server fail`;
                nextActivityType = "WATCHING";
                bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S 🔴");
            } else {
                bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S ⚫️");
            }
        });
    } else if (scrollCount == 2) {
        var mcIP = "creative.heiligemaagden.com";
        var url = "https://api.mcsrvstat.us/2/" + mcIP;

        request(url, {cache: 'no-store'}, function(err, responce, body){
            if (err) {
                console.log(err);
            }
            body = JSON.parse(body);
            if (body.online == true) {
                var maxplayers = body.players.max;
                if (body.players.online >= 1) {
                    var players = body.players.online;
                    nextActivity = `HMC: ${players} out of ${maxplayers}`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C 🟢");
                } else if (body.players.online < 1) {
                    var players = 0;
                    nextActivity = `HMC: nobody`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C 🟢");
                }
            } else if (body.online == false){
                nextActivity = `HMC server fail`;
                nextActivityType = "WATCHING";
                bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C 🔴");
            } else {
                bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C ⚫️");
            }
        });
    } else if (scrollCount == 3) {
        var mcIP = "play.cubecraft.net";
        var url = "https://api.mcsrvstat.us/2/" + mcIP;

        request(url, {cache: 'no-store'}, function(err, responce, body){
            if (err) {
                console.log(err);
            }
            body = JSON.parse(body);
            if (body.online == true) {
                var maxplayers = body.players.max;
                if (body.players.online >= 1) {
                    var players = body.players.online;
                    nextActivity = `CUB: ${players} out of ${maxplayers}`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft 🟢");
                } else if (body.players.online < 1) {
                    var players = 0;
                    nextActivity = `CUB: nobody`;
                    nextActivityType = "PLAYING";
                    bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft 🟢");
                }
            } else if (body.online == false){
                nextActivity = `CUB server fail`;
                nextActivityType = "WATCHING";
                bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft 🔴");
            } else {
                bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft ⚫️");
            }
        });
    } else if (scrollCount == 4) {
        global.smoothElements = undefined;
        var map = webdriver.promise.map;
        (async function gtascrape() {
            var options = new chrome.Options();
            options.headless();
            options.windowSize({width: 640, height: 480});
            options.excludeSwitches("enable-logging");
            let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            try {
                await driver.get("https://support.rockstargames.com/servicestatus");
                await driver.wait(until.elementLocated(By.className("status visible")));
                var rawElements = driver.findElements(By.xpath("//div[@class='flex-xxs-7 flex-xs-12']/div[@class='platforms']/div"));
                map(rawElements, e => e.getAttribute("aria-label")).then(function(values) {
                    smoothElements = values;
                });
            } finally {
                setTimeout(() => {
                    driver.quit();
                    smoothElements.splice(0, 4);
                    smoothElements.splice(1, 4);
                    var serverStatus = "UP";
                    DOWNLOOP: for (var i=0; i < smoothElements.length; i++) {
                        UPLOOP: if (smoothElements[i].endsWith("UP")) {
                            break UPLOOP;
                        } else if (smoothElements[i].endsWith("DOWN")) {
                            serverStatus = "DOWN";
                            break DOWNLOOP;
                        } else {
                            if (serverStatus != "DOWN") {
                                serverStatus = "LIMITED";
                                break UPLOOP;
                            }
                        }
                    }
                    if (serverStatus == "UP") {
                        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online 🟢");
                        nextActivity = "GTA: possible.";
                        nextActivityType = "PLAYING";
                    } else if (serverStatus == "LIMITED") {
                        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online 🟠");
                        nextActivity = "GTA: limited.";
                        nextActivityType = "PLAYING";
                    } else if (serverStatus == "DOWN") {
                        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online 🔴");
                        nextActivity = "GTA servers fail";
                        nextActivityType = "WATCHING";
                    } else {
                        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online ⚫️");
                    }
                }, 2000);
            }
        }) ();
       /* try {
            chan = bot.channels.cache.find(channel => channel.name.startsWith("GTA Online"));
            if (chan.name == "GTA Online ⚪️") {
                chan.setName("GTA Online ⚫️");
            }
        } finally {
            console.log("BLACK CHECK GTA ERROR");
        }*/
        
    }
    scrollCount ++;
    if (scrollCount > 4) {scrollCount = 1};
};

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("didn't find any files");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} was loaded`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

var request = require("request");


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));                                //prefixesnew//

    if (!prefixes[serverid]){
        prefixes[serverid] = {
             prefixes: botConfig.prefix
        };
        console.log(prefixes);
        fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
        });
    }

    var prefix = prefixes[serverid].prefixes;

    global.scrollStatusInterval = setInterval(scrollStatus, 15000); //default: 15000

});

var request = require("request");

bot.on("message", async message => {



    /*var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(`servercheck succesfull at ${dateTime}`);*/

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

//    var prefix = botConfig.prefix;                                                              //prefixdefault//

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));                                //prefixesnew//


    if (!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
             prefixes: botConfig.prefix
        };
        fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
        });
    }

    var prefix = prefixes[message.guild.id].prefixes;

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
        bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft ⚪️");
        bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S ⚪️");
        bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C ⚪️");
        bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online ⚪️");
        bot.user.setActivity("");
        bot.user.setStatus("invisible");

        if (arguments[0] === "r") {
            bot.destroy();
            bot.login(botConfig.token).catch();
        } else {
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Cubecraft")).setName("Cubecraft ⚪️");}, 5000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden S")).setName("Heilige Maagden S ⚪️");}, 5000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("Heilige Maagden C")).setName("Heilige Maagden C ⚪️");}, 5000);
            setTimeout(() => {bot.channels.cache.find(channel => channel.name.startsWith("GTA Online")).setName("GTA Online ⚪️");}, 5000);
            setTimeout(() => {bot.user.setActivity("");}, 5000);
            setTimeout(() => {bot.user.setStatus("invisible");}, 5000);
            console.log("destroying");
            sleep(10000);
            console.log("Now save to quit. press ^C.");
        }
    }

});

console.log("logging in");
bot.login(botConfig.token).catch(console.error);