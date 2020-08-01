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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_24B08C9EF9A10A578B02B43091047B67463040FD6FB20D96D50EA9C926454FB6EC0793D75A7887F9B6B72A77545C28669F20628418A6A5F985D7E08B2854C35460833F3A9C79F6256DD51538FB0FD3BF23E84CE13BEFF3867F01848A2F6816C54CB5B544003924DC77EA62252FCE8BB5B41A20F2285A89557529D60DE8153C12195F2B60A710D7729DEF25096E80B8161689AF0997B5000CDC16F86EBAA4C707B01EE9120EFAAC0CD79568AB113628D652065858F70B3A914EA2B1E52EC2365097181271B468C3DD74BA58AC50395BBBB43241884D7C45F3ED3F8F49FC70C8981F9450693F614A7319B15390A1C8E31C7428F6A57354A6A2650AD1CFED8A5411F7D68398885C80C1CE9D00EC9517B74ACC1738453E908B80DBA7B3D61E554D3B375C5784');
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
        case 'notify':
            client.commands.get('notify').execute(message,args);
        break;
        case 'form':
            client.commands.get('form').execute(message, args);
        break;
    }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');