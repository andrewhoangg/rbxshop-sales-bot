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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D91040506C48DB7112B632A4F2AD00183B1957FE6FA9D9AD0123812464E4DEE79FD1F7FF0D1D7526D4E3E237304C5BA91FA13578FAAF0179FCCCDE22E1FDD9F2D3840E660C022A93859ACA19E551499100A1CA2742EA831FA7BEA632A24C879C836859437AEF1593489A77861B9F101CBB399D67639B1757C15076D61415B0E54CD97733D8EBB92A0A5038DBA62C55C1DE11139CCFA98CBC06D562C3E7C91834EB540320ED7BF7338AC6DDC5D7EE2EB3A21155E13C4EFC4154CD4033E9E31B4A16A8FE599C3253F13C46EEF9CC8D741039E62028AC0C55CCFF313B84953F2464A512B25340E9E6EB89107DA61948CA3F49A513DE0DB235AA9577ACD788F3BE08C09C5AA47AF2F977FEE3366DAFB783A9458A3F610B56403B353FAD7058EFF586B4357953');
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