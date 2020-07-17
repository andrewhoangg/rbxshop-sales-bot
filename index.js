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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_AF69A2A10A9EC1CC2B446DB62DCAB676E5FA22CC220FC3B3858AF715F8AF1A337DB6971C29978E59FA5425360B76FE5240576A144D7D5DB1F04EA14C3134F59C17DFC2E730BCC51CEC19203126237D777A13735A6256802EF5DB0A29C4CF22B3B23F04991669EB5B0102A6D74A50FCD0707FF8D21558E26F2698C40022A34A15C5C5DEEA9A77EFE56118DAA6632BACF9E28F94B3C89223FAFFB6E86617E8E146D78CB66F1C177BF2DD90E578DD81E92969BA92691F1F3A998DE2B3451BFF43367A0CB0C8FF4769046B895C46F72D56DE55E2594AFDF109BE7FF27C9375392F54E12D1D68409183387F1FCF7D4ACF94B0753B285F5E6BE197FAF8F80D82888BFD694FBDEC9B553E551C53B6E034341451669F99BE7569EEC46E5D59F1D71B695ACE5A83C7');
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