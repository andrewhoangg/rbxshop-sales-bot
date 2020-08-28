const fetch = require("node-fetch");
const Discord = require('discord.js');

const groupID = 4050917;

module.exports = {
    name: 'loadstocks',
    description: 'updates ticket status',
    execute (message, args)
    {

        if(message.member.roles.cache.has('745026228796391554'))
        {
            fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
            response.text().then( async function(stock) {
                var parsedstock = JSON.parse(stock)['robux'];
                const Loading = new Discord.MessageEmbed()
                .setDescription("Loading...")
                .setColor("#ffbd54");

                const msg = await message.channel.send(Loading);
                        const embed = new Discord.MessageEmbed();
                        embed.setColor('#ff5a54')
                        embed.setAuthor('RBXShop™️ | Live Stocks', 'https://cdn.discordapp.com/attachments/745010239681724541/745012270702264441/image0_1.png')
                        embed.setDescription('Live updating stocks, refreshes every **5** seconds')
                        embed.setThumbnail('https://sites.google.com/site/freerobuxdm/_/rsrc/1522415767981/home/free-robux.png')
                        embed.addFields(
                            { name: 'Stock 1 (andrew)', value: `**💰 Stock: ${parsedstock}\n⌛ Pending: 70K+\n💳 Sales: 700+**\n Accepted Payment Methods: **PayPal, Zelle, CashApp, Venmo, Apple Pay, Bitcoin**\nCurrencies Accepted: **All**`, inline: true },
                            { name: 'Stock 2 (Builderman)', value: `**💰 Stock: 210K+\n⌛ Pending: 100K+\n💳 Sales: 200+**\n Accepted Payment Methods: **PayPal, CashApp (USD), Bitcoin, e-Transfer, Amazon**\nCurrencies Accepted: **CAD**`, inline: true },
                        )
                        embed.setTimestamp()
                        embed.setFooter('RBXShop Sales');
                        
                        setInterval(() => {
                            msg.edit(embed);
                        }, 5000);
                })
            });
            
        }
        else { return }
        message.delete({timeout: 1000})
    }
}