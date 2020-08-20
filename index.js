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

const groupID = 4050917;

async function rbxlogin() {
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_0506173200DAAD439803810EB2ADB1441A7DFA783ED6B55B268F4FA514922CB2FFCD219BB5634848E7589AB1F73CA99249A48B526BAB3263E4E6DB3B2A9B9D3843894F372ED2A0E7B077FD7BD831C1CD9082D55B80246352080DCC01EAD976F78D5A6B93662423AC4D914F18E4B76E8AB9F1417733CF7D75719713B9D6B73B48911D0108736F031C61E3FE6897D364142C4858EF0CCCA0A6CDA5C03DEAAC48BDC6F4CE623761991ADD66D54BE552D24360883F8EAD8A97F3AD05F4385A91D8641CBFCE017F0ABC5484A55C895AD59BEE390F349E45C170FC417F233858610052EA93B1905459369058DB58E041C0EDAACFD2DEB6B076F003958B307E770DAE200BBF37CFDF2BF1B217845AE1F354A9B4A93F4AE8F7A687674DC01F4F3EB57770391BFD90');
}

async function channelUpdateStock()
{
    setInterval(() => {
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
            response.text().then(function(stock) {
                var parsedstock = JSON.parse(stock)['robux'];
                    if (parsedstock === 0)
                    {
                        client.channels.cache.get("745025981340844123").setName("❗ RESTOCKING! ❗");
                    }
                    else
                    {
                        client.channels.cache.get("745025981340844123").setName("💰 STOCK: " + numeral(parsedstock).format('0,0') + " 💰");
                    }
                }); 
            }); 
    }, 60000);
}

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('fighting with Discord');
    channelUpdateStock();
})

client.on('message', message => {
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

client.login('NzMwMjY4MDQ5NjEzMTI3NzMy.XwVBHg.LfCOXcsV4DIPiYr-niZImugNtlk');