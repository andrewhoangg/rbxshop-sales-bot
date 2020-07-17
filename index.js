const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const prefix = '!';

let groupId = 4050917;

const noblox = require('noblox.js');
const fileSystem = require('fs');
client.commands = new Discord.Collection();


const commandfiles = fileSystem.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


async function rbxlogin() {
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CE916A1961ADEF5DAEDAE1B68522E49187001F4F098F7111D31624A894FE1B903E6903C263BE56CD86C8DDABA4A2B33F3809F24162C57030ED433E2F2CB873306775D1989D0E84AD10ED1165EA47BAC1411E2940A21D43F8D693F36FB4E879114EE03FDFDEAC8D6DDF9156E61D34AE58AFD4CE465197A512988E3067D0BB2565F62777A69036B55D001392FB208BAF837E28973C7F44DA84117E482852A8E9E241613F3993855449D0F55DCACEE1FB9FAE33EBF6BCA6BA0851C00B9A29C4E0F8D70DBAF3C79F1F4AE09DE9A1E324BF2CB414646DD5E3A3DC6E94C8D24DD0FA715A4FC6959E004C8D7C2D185E014CCA833000467FB6D2999C5C3620C917D865CE3934EE455C22C163C9CA23FC1E00A0BF46F9A74D8842CBC93A315FDC375679BF456093FE');
}

function channelUpdateStock()
{
    setInterval(() => {
        fetch('https://cdn.shadowcheats.com/roblox/economy/v1?groups=' + groupId).then(function(response) {
            response.text().then(function(stock) {
            if (stock === "RESTOCKING!")
            {
                client.channels.cache.get("728507809963966465").setName("❗ RESTOCKING! ❗");
            }
            else
            {
                client.channels.cache.get("728507809963966465").setName("💰 STOCK: " + stock + " 💰");
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
    }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');