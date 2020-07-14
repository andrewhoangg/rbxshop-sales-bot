const Discord = require('discord.js');
const noblox = require('noblox.js');
const fetch = require('node-fetch');
const fs = require('fs');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

const prefix = '!';

let groupId = 4050917;


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
                client.guild.channels.cache.get("728507809963966465").setName("❗ RESTOCKING! ❗");
                console.log('out of stock');
            }
            else
            {
                client.channels.cache.get("728507809963966465").setName("💰 STOCK: " + stock + " 💰");
                console.log('in stock');
            }
        });
      });
    }, 1000);
}

client.on('ready', async message => {
    console.log(`Logged in as ${client.user.tag}!`);
    rbxlogin();
    client.user.setActivity('!stock for stock info');
    //channelUpdateStock();

    // test
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    switch (command)
    {
        case 'ping':
            client.commands.get('ping').execute(message, args)
        break;
        case 'send':
            const embed = new Discord.MessageEmbed()

            const input_name = args[0];
            const input_val = args[1];

            if(message.member.roles.cache.some(r => r.name === "root"))
            {
                noblox.getIdFromUsername(input_name).then(id => {  
                    fetch('https://cdn.shadowcheats.com/roblox/economy/v1?groups=' + groupId).then(function(response) {
                        response.text().then(function(stock) {
                            if (input_val < stock || input_val === "RESTOCKING!")
                            {
                                embed.setColor('#f54242')
                                embed.setTitle("Error: Insufficient Funds")
                                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                                embed.setDescription('Please check the stock before sending funds!')
                                embed.setTimestamp()
                                embed.setFooter('RBXShop - Founded by andreww & Reversed');
                                message.channel.send(embed);
                            }
                            else
                            {
                                noblox.groupPayout({ group: 4050917, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                    
                                embed.setColor('#00ff1a')
                                embed.setTitle("Purchase Complete, your funds have been sent!")
                                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                                embed.setDescription('Thank you for purchasing from RBXShop, you should have received the "Verified Buyers" role. Please leave a vouch in #vouches!')
                                embed.setThumbnail('https://image.spreadshirtmedia.net/image-server/v1/compositions/T812A1PA3811PT17X49Y47D167531197FS2951/views/1,width=650,height=650,appearanceId=1/haha-yes-order-executed.jpg')
                                embed.setTimestamp()
                                embed.setFooter('RBXShop - Founded by andreww & Reversed');
                                message.channel.send(embed);
                            }      
                    setTimeout(function(){
                        message.delete();
                    }, 500);
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
                        message.channel.send(embed);
                    }
                    else 
                    {
                        embed.setColor('#00ff1a')
                        embed.setTitle(input_val + " Robux at a rate of 0.0055/1 is $" + Math.round(input_val * rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD!")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed'); 
                        message.channel.send(embed); 
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
                        message.channel.send(embed);
                    }
                    else
                    {
                        embed.setColor('#00ff1a')
                        embed.setTitle("$" + input_val + " USD can get you " + Math.round(input_val * rate2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Robux!")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');
                        message.channel.send(embed);
                    }
                }
                
            }
            break;

        case 'open':
            if(message.member.roles.cache.some(r => r.name === "Founders" || message.member.roles.cache.some(r => r.name === "Management")))
            {
                message.guild.channels.cache.get("732016195112403116").setName("✅ SALES: ONLINE ✅");
            }
            else { return }
            setTimeout(function(){
                message.delete();
            }, 500);
        break;

        case 'close':
            if(message.member.roles.cache.some(r => r.name === "Founders" || message.member.roles.cache.some(r => r.name === "Management")))
            {
                message.guild.channels.cache.get("732016195112403116").setName("❌ SALES: OFFLINE ❌");
            }
            else { return }
            setTimeout(function(){
                message.delete();
            }, 500);
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
                        embed.setDescription('We currently have robux in stock! If you would like to purchase, please create a ticket in #purchase-robux. Make sure to @ andreww#5754 or Eljack#3392 in your ticket for faster response!')
                        embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop - Founded by andreww & Reversed');   
                    }
                message.channel.send(embed);
                setTimeout(function(){
                    message.delete();
                }, 500);
            });
          });
        break;
        }
});

client.login('NzMwMjY4Mjc1MTYxNjk0MjQy.XwwE_Q.mAW_JxtrGRQN-R2b1s_K1OTJ_e4');