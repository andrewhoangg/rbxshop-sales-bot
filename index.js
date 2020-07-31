const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const prefix = '!';

const noblox = require('noblox.js');
const fileSystem = require('fs');
client.commands = new Discord.Collection();

var numeral = require('numeral');

const commandfiles = fileSystem.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


async function rbxlogin() {
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_198BC958A55EC21B6775320284B6CA4463F9C6C8C8492CF3E22F5FA4DE1114A9916B74226FBBB8F19F46D896444B137B7314D3FB8A13E792F04E82C15739CEEE0CF187B07A3B782E4DE79001ACD197C1ACFCFF733D91A9EC02B5D583223EF0FBD7D821FCB34946D588FEB8DEF50F3917D22EC317F2EAF5CC6AC2F892ADA6EA58B1025F1AE97D353D59F89E10537AFE33642D3A06ED077FF828EF569612F21A8FE558C61684F15D853FD280028C6A2F09331A251EFECE3A83249D45E8682A641239006F66B2A678BAE3E131E9C5CA65148C655CC0C05B01AEAA1EF13811832ED8BF0F8426E6B58718B29E8C6F02B00678BA640F16A9149288AC704AB90FEBD97915FF5F10C0C00022C93708CCD6AF35C8C7213D306A551B659BC419E0312EC31AA96732AA');
}

function channelUpdateStock()
{
    
    setInterval(() => {
        fetch('https://economy.roblox.com/v1/groups/4050917/currency/').then(function(response) {
            response.text().then(function(stock) {
                var parsedstock = JSON.parse(stock)['robux'];
            if (parsedstock === 0)
            {
                client.channels.cache.get("728507809963966465").setName("❗ RESTOCKING! ❗");
            }
            else
            {
                client.channels.cache.get("728507809963966465").setName("💰 STOCK: " + numeral(parsedstock).format('0,0') + " 💰");
            }
        });
      });
    }, 120000); // updates every 2 minutes

/*
    setInterval(() => {
        fetch('https://economy.roblox.com/v1/groups/4050917/revenue/summary/Day').then(function(response) { // updates pending robux
        response.text().then(function(stock2) {
            var parsedpending = JSON.parse(stock2)['pendingRobux'];
           //client.channels.cache.get("728507913248964638").setName("⌛ PENDING: " + numeral(parsedpending).format('0.0a') + "  ⌛");

           console.log(stock2);
        });
      });
    }, 1000); */
}

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('!stock for stock info');
    //channelUpdateStock();
});

client.on('message', message => {
    const embed = new Discord.MessageEmbed()
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    switch (command)
    {

        case 'link':
            client.commands.get('link').execute(message,args);
        break;

        case 'send':
            client.commands.get('send').execute(message,args);
        break;

        case 'convert':
            client.commands.get('convert').execute(message,args);
            break;

        case 'open':
            client.commands.get('open').execute(message,args);
        break;

        case 'close':
            client.commands.get('close').execute(message,args);
        break;

        case 'stock':
            client.commands.get('stock').execute(message,args);
        break;
        case 'form':
            client.commands.get('form').execute(message, args);
        break;
    }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');