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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_4A0EFDF32E70D0E5E18FCA6450DA773DB9F5A8C689F117F3D5B6DFB82C228178E1FA002C545DF1CE4F4756E31E9BD9A8B2F4F463A9C67EBD9665031C86F92E65B0EF7BFEE5ECF922C7E13AE2E01AFC1BE202FD1ED816BDA10F557F51F70B3921E3BB068D4B62AA13F6F8F12D18B30658C622F0746AE3932BE35D661E87BFB4B3578E08075604E032B239B438FEAAB667E9CE6C44BB9F44EF7C9B79593A7E1B2A991DA5777BDAC517E61D2B5AA0C46249A0B32014579170053B3F75A9004F63FEBD6FA9088053DF14E075FB30D0437A15966968867674A345698B267FF3F84632FC6B03487C85BE232577907E97D7AD7E00796642152766D5A8612C0A6D2E6A2127968F9C1A962469B3B63DD02437CF471078ED8A9FE13EA3A6628C0EE3F4EE8B9A2BB5A1');
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