const Discord = require('discord.js');
const fetch = require("node-fetch");

const client = new Discord.Client();
const prefix = '!';
const noblox = require('noblox.js');
const fileSystem = require('fs');
client.commands = new Discord.Collection();

const embed = new Discord.MessageEmbed();
var numeral = require('numeral');

const commandfiles = fileSystem.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const groupID = 4050917;

async function rbxlogin() {
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_38AA3D2920CA320883C05B7E4B4E2C11818503DC0AF7F81EF6A1D6D481D1548815F29F25E3CAD22D6E7BB30DD665C3568955A75CDDBA46AB28EA68E3BDB566C5AA055EA7925AC237277D51AF00310720AFB88CBDFA40AA1E86D3C9989C2675B6ACC7C10287135919192CAF592B16119FF1360FAD51864271CF4686C74D228EE751D37FA1CCAEBCC0034B0DC763A3626262AF05E614C25A6581A886A1F027A60CCF41E41C867FB4415D25DD26EA09F76E64EBA2749C7DFB6E77CE538546CACEE3306A7593F2BF7219F17B420D55BB9DC9B0AC7910247FC61FF176ACF10AE379791F14D2D8B0357653EC38831411CE17EE8A342098228A4F604D4F640531BB86A2F18A5675A200DFEB47DE45EDCD3C17D09413739A66D6D7C42B9763F7E8A86F4E5E474D0CF449D48410DD4AC36E75BFE8CC6DDDA5');
}

async function channelUpdateStock()
{
    setInterval(() => {
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
            response.text().then(function(stock) {
                var parsedstock = JSON.parse(stock)['robux'];
                    if (parsedstock === 0)
                    {
                        client.channels.cache.get("746112840271659078").setName("❗ RESTOCKING! ❗");
                    }
                    else
                    {
                        client.channels.cache.get("746112840271659078").setName("💰 STOCK: " + numeral(parsedstock).format('0,0') + " 💰");
                    }
                }); 
            }); 
    }, 60000);
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
            const input_name = args[0];
            const input_val = args[1];
    
            if (message.member.roles.cache.has('746112821904801913'))
            {
                noblox.getIdFromUsername(input_name).then(id => {  
                    const oweAmount = (message.channel.name).substring(4);
                    const oweAmount2 = (oweAmount - input_val);
                    
                    if ((message.channel.name).substring(0,4) == "owe-")
                    {
                        if (oweAmount2 == 0)
                        {
                            message.channel.setName("robux-paid");
                            embed.setColor('#00ff1a')
                            embed.setTitle("Purchase completed!")
                            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                            embed.setDescription(`Thanks for purchasing from RBXShop, all of your funds have been sent and this ticket is now complete. Please leave a vouch in <#746112856747016392>!`)
                            embed.setThumbnail('https://i.ebayimg.com/images/g/KWoAAOSwp5xep-yx/s-l640.jpg')
                            embed.setTimestamp()
                            embed.setFooter('RBXShop Sales');
                            message.channel.send(embed);
                        }
                        else 
                        {
                            message.channel.setName("owe-" + oweAmount2);
                            noblox.groupPayout({ group: groupID, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                            embed.setColor('#fcd703')
                            embed.setTitle("Funds successfully sent!")
                            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                            embed.setDescription(`**${input_val} Robux** has been sent to **${input_name}**, more is on the way!\nPending robux: ${oweAmount2}`)
                            embed.setTimestamp()
                            embed.setFooter('RBXShop Sales');
                            message.channel.send(embed);
                            
                        }
                    }
                    message.delete({timeout: 1000})
                }).catch(err => {
                    embed.setColor('#f54242')
                    embed.setTitle("Error Caught")
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription(`Error: ${err}`)
                    embed.setThumbnail('https://cdn.discordapp.com/attachments/571908659043631104/740041143143628850/error-48242.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');
                    message.channel.send(embed);
                });
                const embed2 = new Discord.MessageEmbed();
                embed2.setColor('#00dcff')
                embed2.setAuthor('RBXShop Payouts Log', 'https://cdn.iconscout.com/icon/free/png-512/log-file-1-504262.png')
                embed2.setDescription(`**Robux sent by:** <@` + message.author + `> \n **Amount:** ${input_val} Robux\n **Recipient Account:** ${input_name}`)
                embed2.setTimestamp()
                embed2.setFooter('RBXShop Sales');
                client.users.cache.get('689231007932481550').send(embed2);
            }
            else {return message.reply("Unauthorized");}
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
        case 'mark':
            client.commands.get('mark').execute(message, args);
        break;
        case 'test':
            //client.commands.get('test').execute(message, args);
        break;
    }
});

client.login('NzMwMjY4MDQ5NjEzMTI3NzMy.XwVBHg.WWlPaD5EE1gVe1Vo1F-8uY6mWeI');