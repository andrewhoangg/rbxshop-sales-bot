const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const prefix = '!';

var numeral = require('numeral');

let groupId = 4050917;


const noblox = require('noblox.js');

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
    }, 120000);
}

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('!stock for stock info');
    channelUpdateStock();
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    switch (command)
    {

        case 'link':
            const input_linktype = args[0];

            if (message.member.roles.cache.has('732170807446339634'))
            {
                if (input_linktype === "group")
                {
                    message.channel.send("https://www.roblox.com/groups/4050917/OFFICIAL-Panders-Community#!/about");
                }
                else if (input_linktype === "paypalqr")
                {
                    message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/730532175132491857/image0.png");
                }
                else if (input_linktype === "cashappqr")
                {
                    message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510511708373064/Screenshot_20200703-002028.png");
                }
                else if (input_linktype === "venmoqr")
                {
                    message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510581862170664/Screenshot_20200703-002051.png");
                }
                else
                {
                    message.reply("Invalid argument! Usage: ```!link [group/paypalqr/venmoqr/cashappqr]```")
                }
                message.delete({timeout: 500})
            }
        break;

        case 'send':
            const embed = new Discord.MessageEmbed()

            const input_name = args[0];
            const input_val = args[1];

            if(message.member.roles.cache.has('732170807446339634'))
            {
                noblox.getIdFromUsername(input_name).then(id => {  
                    fetch('https://cdn.shadowcheats.com/roblox/economy/v1?groups=' + groupId).then(function(response) {
                        response.text().then(function(stock) {
                            noblox.groupPayout({ group: 4050917, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                    
                            embed.setColor('#00ff1a')
                            embed.setTitle("Purchase Complete, your funds have been sent!")
                            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                            embed.setDescription('Thank you for purchasing from RBXShop, you should have received the "Verified Buyers" role. Please leave a vouch in #vouches!')
                            embed.setThumbnail('https://image.spreadshirtmedia.net/image-server/v1/compositions/T812A1PA3811PT17X49Y47D167531197FS2951/views/1,width=650,height=650,appearanceId=1/haha-yes-order-executed.jpg')
                            embed.setTimestamp()
                            embed.setFooter('RBXShop - Founded by andreww & Reversed');
                            message.channel.send(embed);     
                            message.delete({timeout: 1000})
                });
            });
        }).catch(err => message.reply("user not found pussy"));
    }
            else { return }
        break;

        case 'convert':
            {
                const embed = new Discord.MessageEmbed()

                const input_type = args[0];
                const input_val = args[1];
                
                let rate = 0.0055; /*0.0055 per 1 R$*/
                let rate2 = 181.8181818181818; /* <-- per $1 */

                numeral.defaultFormat('$0,0.00');

                if (input_type === "robux") // R$ -> USD
                {
                    if (isNaN(input_val) || input_val < 0)
                    { 
                        embed.setColor('#f54242')
                        embed.setTitle("Error: Invalid argument")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('Numbers must be a number and greater than 0!')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');
                    }
                    else 
                    {
                        embed.setColor('#00ff1a')
                        embed.setTitle(input_val + " Robux at a rate of 0.0055/1 is " + numeral(input_val * rate).format('$0,0.00') + " USD!")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed'); 
                    }
                }
                else if (input_type === "USD" || input_type === "usd") // USD -> R$
                {
                    if (isNaN(input_val) || input_val < 0)
                    {
                        embed.setColor('#f54242')
                        embed.setTitle("Error: Invalid argument")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('Numbers must be a number and greater than 0!')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');
                    }
                    else
                    {
                        embed.setColor('#00ff1a')
                        embed.setTitle("$" + input_val + " USD can get you " + numeral(Math.round(input_val * rate2)).format('0,0') + " Robux!")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');
                    }
                }
                message.delete({timeout: 1000})
                message.channel.send(embed)
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                
            }
            break;

        case 'open':
            if(message.member.roles.cache.has('732170807446339634'))
            {
                message.guild.channels.cache.get("732016195112403116").setName("✅ SALES: ONLINE ✅");
            }
            else { return }
            message.delete({timeout: 1000})
        break;

        case 'close':
            if(message.member.roles.cache.has('732170807446339634'))
            {
                message.guild.channels.cache.get("732016195112403116").setName("❌ SALES: OFFLINE ❌");
            }
            else { return }
            message.delete({timeout: 1000})
        break;

        case 'stock':
            fetch('https://cdn.shadowcheats.com/roblox/economy/v1?groups=' + groupId).then(function(response) {
                response.text().then(function(stock) {
                    const embed = new Discord.MessageEmbed()
                    if (stock === 'RESTOCKING!')
                    {
                        embed.setColor('#ff7f00')
                        embed.setTitle('💰 Current Stock (LIVE): **RESTOCKING!**')
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000962048030/outofstock.png')
                        embed.setDescription("Oops! Due to high demand, we're currently out of stock! Restocks usually occur every few hours, it depends when our funds get unpended. If you would like to purchase, please create a ticket in #purchase-robux. Make sure to @ andrew or Eljack in your ticket for faster response!")
                        embed.setThumbnail('https://images.rbxcdn.com/9281912c23312bc0d08ab750afa588cc.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');   
                    }
                    else
                    {
                        embed.setColor('#00ff1a')
                        embed.setTitle('💰 Current Stock (LIVE): **' + stock + '** 💰')
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('We currently have robux in stock! If you would like to purchase, please create a ticket in #purchase-robux. Make sure to <@490427270624968734> or <@175274883196911616> in your ticket for faster response!')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');   
                    }
                message.delete({timeout: 1000})
                message.channel.send(embed)
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
            });
          });
        break;
    }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');