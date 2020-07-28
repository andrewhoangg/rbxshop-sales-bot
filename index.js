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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_003EB23F10B7181906F0A8DD2DAC0A4F69020AB365F6545DEA7255A336E97A3D3ED4421C85B7DCBA5B8A44B84C058C86E5A29FD417B718D8B7E576B809A6B4F982613E623ECE5A7A56D4A30F3E4556E4E04F06E80AEF7D090736B553FC1E9942469C46ED80CB978BA1D4F6BC5D1037325745F537577BFF9DD239CFFC27DD5D3730C1DF0E6FE93C20998828DF3752E12B48079115858544CEB9D733FCF2473C7958AE43FB4CC1B091A580EA23E7D5F64987A36F3D9081FF15EE956DD636D64F01F6750C0F7F62F6F93074C0AA43725E7DBA3EC93D3A5A4148A7A2091D9744899A9513D88AD1849BED1C9DC2CB34FD53FD04A014B72E42BC018ABD0278F96560DD1D97A601B31C75E69FEA8F7BF59AD095E2FB298BF0AD174C86C03FE01095EB7D627863A6');
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