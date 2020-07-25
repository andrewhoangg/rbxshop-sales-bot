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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_BD196FE119A0CA5E55E0515D0DBFCF5770E031151EB361B28F9D8AAD3886A6F66E7231A307D5750A5A23353AE92DE4C57BA095C750ED8313977B098E158F35D1EBA911D99A73E8AE7AAE5A6C753BC93B48EA45A76068733DB5FB6493AA807B7603CC31247A193BFF87DA7C8401919653A128E9D6D3306A37586B1BE52E507DFE4B1D5B830E508DCD62EE74C190345A53B7DB23B979BB5C1814D83DE558F423001D15765D27024CE5E99794402F13864EFBD9BBD02806210A14C3A64BFE381C52A5013FD08F5419FFAEDC78C79793034CA3654B7E0ADC8B0F2FC146959DC16146D3B5E95D2B7B602941F8AF24C4D633776797BFF6BA8D1B039723E5941DFC00FF99C9F2BF0DA334FE0356947963B9C5780BFC88705850756E46D5A2677E3F28E890CD5493');
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