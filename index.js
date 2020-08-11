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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_BC84DB0AE9163009154AD7A6B018DDD0D19F2D34A2F52AB8D518A5DC4BB04E93FD49C948FEDA12AD6AD73612E97F3E24FB9994CF6A022BDE2669CCBC598DC56646C1C1554F30C3AC784C02E53BCCF3E071C398AD263E990A6664203B4BB85B507EEC86B1A74FC8DEA6C49D732D020242C3667E4744408A5D8D1B8B7C17FEB55B630B0D14910F1FA6164EC2085ACD13223A47B97A3C819C4865E5CE394ED6BBA18E517137C1F60BE1B6FD95A47F78C87444EED34E11A845E0678C8D5B1692F9CF2E1FFD6DCFBF9D708D08C8847706F1BAEAE7546B8E83E535757995F293A4F84F22EDE4798D63503747955FE9F31EF8D4E6DC0181CB7D2C0B85DF22FBA3AEB14AB05F031157F32C3E46BF9E66D236BEBB4525B7612B6311489B26DED04C4781D9EDEA5DA2004F235658E474E8F99EAA66844DFCDB');
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


            fetch(`https://economy.roblox.com/v1/groups/5442115/currency/`).then(function(response) {
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
        case 'notify':
            client.commands.get('notify').execute(message,args);
        break;
        case 'form':
            client.commands.get('form').execute(message, args);
        break;
    }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');