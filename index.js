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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_535011F7C892751CC656EB36D52DEE790BCAF69EFA44D9637D12F9BB574B01A4A4152380D87ADF4A2097305EDBFAAD9B894E6F4DDFCD75196F8551643335A4B80B985E55957C447A5585C8A8647C25D5DD5FCB420FC58D11BF027083ED3C5CD6E76F0E27F14413A817D1141EC3E7F3481693DEB1FB34A3327D1F50AD6A5A9FC765C30FE8DA7842750C3838EE00FEB4764688951BFA8CF9FD7C21070ECC0E84CF62D47C0C2630C61AA770EE7EEC82C27DC3BD78AD6BF5B27EA47E6E67142125D5A09AB1BD5DB91975264A0736E232B2B11D549B8B5DBB9CB48BE3AB7EA2CE41871BD554B738D80C26F15C001328AA500F86009D69F0D34AF3E4C533358E792F0E2CEB135F401C8C51F211AB05CFC34EA0898E60FFDED7B18F4068F9DB5225F975268D9F2B');
}

function channelUpdateStock()
{
    setInterval(() => 
    {
        fetch('https://economy.roblox.com/v1/groups/7082916/currency/').then(function(response) {
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