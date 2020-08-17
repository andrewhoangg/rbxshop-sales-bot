const Discord = require('discord.js');
const fetch = require("node-fetch");

const Request = require('request-promise');
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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5E4B8230E33272C8BAC16979F2D93458011A05BE26D65B66CC0CC7F8A352F7EA96FC7F72E0270E3B1E5D189D322E2FA9CBF2737809DFA51D5052F053EAA9E0683DA8306679A05CD3FEA24D72C4576D50E3319129F8C6BAF72D4287C69DAFD40AAB04F598CE742C6BFF996BE4BA8F8326A6DD28E246A6D261F9903B5FA8EC96852C197B5D581791778A04B8BCC605E4FBD279511FAFD6D74BAC9B82C85136CDC21EA95FB9D1A257232CFF76894D20B3966A4461377285D854598E461BAC182B3172D5EA0AE0DCCC8A63EB27581498F290A3FADE4726FB5DC62ADEA1E5FBB2A19C4F89A7381B76A42EB2C2F2D977F0C5F07E104AA81633CDD23089787AA88D9DA391B2DBDBF4B6EFB0F08702AEEF453B62C177A2267D86C78F204BA067CF81A45AC8BF00D0');
}

async function channelUpdateStock()
{
    setInterval(() => {
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
            response.text().then(function(stock) {
                var parsedstock = JSON.parse(stock)['robux'];
                    if (parsedstock === 0)
                    {
                        client.channels.cache.get("744107016162902079").setName("❗ RESTOCKING! ❗");
                    }
                    else
                    {
                        client.channels.cache.get("744107016162902079").setName("💰 STOCK: " + numeral(parsedstock).format('0,0') + " 💰");
                    }
                }); 
            }); 
    }, 60000);
}

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('handling robux sales');
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

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');