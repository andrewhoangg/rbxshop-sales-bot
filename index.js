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
for (const file of commandfiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const groupID = 4050917;

async function rbxlogin() {
    await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_59DE807B89C63B868488617037ABCB884A0DDD0748AE6CEDA4968236A8C95C2F598BE782A86BE61E60578C2322AC1FB7677C03081E670A38524A569A26864CC988035FB0E528F09963A81C51B21867D17AD2315C9B3213D302ACADFD09AAABD659BC774600C0A9F1940EAA150BFB9224236E0F596AAA74DF38952D2052F614589F0D4BA4172071CA8C1933CA0FA7FF545FED52A298D2B00A0A18B5A69BA63072615908EDCE096702C1B0A6A43D23907D7FA8D17A105AF455FE3A78C7E30743DBB6940213A3C694E82D322F40BBAF6B28CB5ECF90B4978FE58CB48BDA61DD84A6B61DC45CCB6FBAA6D08096ABA9B5664721B32C0DAF1B1A68737A95F655A5EE23C63922B77C4C4771BB63BE622EB378CE19998D6402D2D05990F6077F97062F037819DDE5');
}

async function channelUpdateStock() {
    setInterval(() => {
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function (response) {
            response.text().then(function (stock) {
                var parsedstock = JSON.parse(stock)['robux'];
                if (parsedstock === 0) {
                    client.channels.cache.get("746112840271659078").setName("❗ RESTOCKING! ❗");
                }
                else {
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

    switch (command) {
        case 'link':
            client.commands.get('link').execute(message, args);
            break;

        case 'send':
            const input_name = args[0];
            const input_val = args[1];

            if (message.member.roles.cache.has('746112821904801913')) {
                noblox.getIdFromUsername(input_name).then(id => {
                    const oweAmount = (message.channel.name).substring(4);
                    const oweAmount2 = (oweAmount - input_val);
                    noblox.groupPayout({ group: groupID, member: [id], amount: [input_val], recurring: false, usePercentage: false })

                    if ((message.channel.name).substring(0, 4) == "owe-") {
                        if (oweAmount2 == 0) {
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
                        else {
                            message.channel.setName("owe-" + oweAmount2);

                            embed.setColor('#fcd703')
                            embed.setTitle("Funds successfully sent!")
                            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                            embed.setDescription(`**${input_val} Robux** has been sent to **${input_name}**, more is on the way!\nPending robux: ${oweAmount2}`)
                            embed.setThumbnail('https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png')
                            embed.setTimestamp()
                            embed.setFooter('RBXShop Sales');
                            message.channel.send(embed);
                        }
                    }
                    message.delete({ timeout: 1000 })
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
            else { return message.reply("Unauthorized"); }
            break;

        case 'convert':
            client.commands.get('convert').execute(message, args);
            break;

        case 'open':
            client.commands.get('open').execute(message, args);
            break;

        case 'close':
            client.commands.get('close').execute(message, args);
            break;

        case 'stock':
            client.commands.get('stock').execute(message, args);
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