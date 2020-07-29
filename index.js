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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A0F3F17C0E75379137B8FF4E960BFC88AE28B34FB20B673B7066A26A3C1B99FFA1FEFF66526F8EEECB8B4FAFB5779B0D94D4D3D953318A222BB9BEFA259215DC491BD7F554DD60439946ED2F287019E53F9D0E4185813A11109D7D7C4F5DEEC4B42F979467042A3A432DB3EE6EA6590B3CDBF550293C0BC556186532C13CCFF57E9F4383321C01D6D82374A78A7E7D282F106DC6A07076061B1D1D321EE095B32D93A09A24464752B9ED83DEB2F7338255BDA4684FBC8F6B29CD798E44961E818D016B1F7DDF614114D566A6E75C7ED53498BC984538996B764C89399530B45C99EF787510625B4C5C828DC9E13E08E4517BA4413D1E3204D62667423F864EBCB12F24FB69C2FAC45997DFD6E9E1320FE38ECD64094D4498F9D35A712E0A9349E35F00F2');
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
    channelUpdateStock();
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