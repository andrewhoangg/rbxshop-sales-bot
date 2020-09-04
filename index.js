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
  await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5520F62B5B12B029DA62D922861C82B59DA444741A0F3771549827617EC15783CD4C09383C4D63A34BB79EADC808EE1994038C33A7BBDAA5132ACCFA301D040CDD90A803EE0959B8034B5B68B70D093E44888A92048D4E33B6043FDADC6DA4C0678FD315A79BF61D9D7F42615C10486DD51A98BEC4868004DD62EB5C794E1E59BCB8F06D5F21F8D532BC407EBDE94EA6CE2C453077BCDAA508ABF0E9595B1A147313EFAC746C934D7BA32A036A692E8F0B948CD20F70A6530B8B1072C3F167358193A03B8D38C19CB5A5F46CDA83250C8B1BEA37908AC819CB998858176587E36840B47D9EB66CDA11A818C35482C811042F037FCA86258BBA4DD88CEF7FEDF8733D0CFBC4C35C24ADD1EAF26660B766898BFDF0BA37B60D5FF947DC732E387BEA0965BFE3016C2FBF2525A2D86060C144066FB3');
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
                    noblox.groupPayout({ group: groupID, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                    embed.setColor('#00ff1a')
                    embed.setTitle("Purchase complete, your funds have been sent!")
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription(`**${input_val} Robux** has been sent to **${input_name}**. Please leave a vouch in <#746112856747016392>!`)
                    embed.setThumbnail('https://cdn.discordapp.com/attachments/571908659043631104/740045820430385202/kindpng_4312134.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');
                    message.channel.send(embed);
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
        case 'loadstocks':
            client.commands.get('loadstocks').execute(message, args);
        break;
    }
});

client.login('NzMwMjY4MDQ5NjEzMTI3NzMy.XwVBHg.LfCOXcsV4DIPiYr-niZImugNtlk');