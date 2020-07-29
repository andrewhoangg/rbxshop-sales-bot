const noblox = require('noblox.js');
const fetch = require("node-fetch");

const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()

module.exports = {
    name: 'send',
    description: 'sends group funds',
    execute(message, args) {
        

        const input_name = args[0];
        const input_val = args[1];

        // !send metaconcat 1

        if(message.member.roles.cache.has('732170807446339634'))
        {
            noblox.getIdFromUsername(input_name).then(id => {  
                fetch('https://economy.roblox.com/v1/groups/4050917/currency/').then(function(response) {
                    response.text().then(function(stock) {
                        var parsedstock = JSON.parse(stock)['robux'];

                        if (input_val > parsedstock)
                        {
                            message.reply("You can't send more than what's in stock!")
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
                            embed.setFooter('RBXShop Sales');
                            message.channel.send(embed);
                            message.delete({timeout: 1000})
                        }

            });
        });
    }).catch(err => message.reply("user not found pussy"));
}
        else { return }
    }
}