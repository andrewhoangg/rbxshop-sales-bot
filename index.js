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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_F26A94CBCA03DE2BF7D965C9D4308F4BACE66F7E75F3F4CDEB08960A2301BD10E654A0AB0C3941DBBEA6FA8530E08BD377F10B9297D6C13F71D7D91AFEF80CB905B1054B8F1864341F4D6C9D759D165610F66E93EE792DAB50C2477487243B6059ACDE824ED27BDA1CEAE28C73F21A162EA6B1722EFF7B3B38FB88D1D3328975EDCD9FF71AA56D05EC2C9F7031A96816FE17BB3A4772074F21014E0CBEC87FD36157F80FF68F66F33A26DFC94082EEE154BC54E6973F11DEA3EF86CEC9CA7C63B00B5355D1E9B17D380C71214C691E22BE7FFFA8A5101184E036FC4392F9FE5BAAA2AB8FDB273E16AADEC4D5160EB5BCF6FD655A3F7B80F51F2283C7EE3E3CD22271A9CAB9173E3A12F41787DADFC113CD0AF5FDAD9D7504CCE1DF603A890FB60F047D43');
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

    setInterval(() => {
        fetch('https://cdn.shadowcheats.com/roblox/economy/v1?groups=5223832').then(function(response) {
            response.text().then(function(stock) {
            if (stock === "RESTOCKING!")
            {
                client.channels.cache.get("735917643399299234").setName("❗ RESTOCKING! ❗");
            }
            else
            {
                client.channels.cache.get("735917643399299234").setName("💰 STOCK2: " + stock + " 💰");
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