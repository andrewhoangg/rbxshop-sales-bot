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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_E33455552C3680C30EDA0F8E958D4CF309E68F24DC2482BC9F3D226122A5E5CA092BB7DD8F7B69924594AF7B98DE3EC721A3C7E270BC5FA13A5566CB8FBE9AB5DA61C8FA95103A6A68D869629832DF29F11D09DB44F3357ADF2D716B639ABCD1F2DE40B6641196C02BBD84A72A0C2793DAF538218D3B41DA2A40989F62DA3A3298BF4346923D4A7C5B0B74B19D83DC5D7DB21FA642EFF90091C1FFA764E0F4626E1271A8C81A6C2CC59DA4B0879F9C971D696830CB33BFA3EC008F189B9505FE0F4A7DDAA588454475E8CF63407837C81BEB34181476214487690DE1D43AA0F9B16BB80732EB6D761262B2C69CF657B4F2B33E22EE187874E3565B736C7066E9B9D2065C953C4272A14264B105E423CC2419F2EF09191CB0DA2AC794780A11C5C4890AB90B828AB89D11B7339D580FB729381248');
}

function channelUpdateStock()
{
    setInterval(() => 
    {  
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
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


            fetch(`https://economy.roblox.com/v1/groups/7345267/currency/`).then(function(response) {
                response.text().then(function(stock) {
                    var parsedstock = JSON.parse(stock)['robux'];
                        if (parsedstock === 0)
                        {
                            client.channels.cache.get("742467460791402586").setName("❗ RESTOCKING! ❗");
                        }
                        else
                        {
                            client.channels.cache.get("742467460791402586").setName("💰 STOCK2: " + numeral(parsedstock).format('0,0') + " 💰");
                        }
                    });
                });
         }, 12000); // updates every 2 minutes
    }

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('!stock for stock info');
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