const noblox = require('noblox.js');
const fetch = require("node-fetch");

const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()

const groupID = 4050917;

module.exports = {
    name: 'send',
    description: 'sends group funds',
    execute(message, args) {        

        const input_name = args[0];
        const input_val = args[1];

        if (message.author.id != '745026228796391554') return message.reply('Unauthorized, please contact <@490427270624968734> to send from Stock 1')
        {
            noblox.getIdFromUsername(input_name).then(id => {  
                fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
                    response.text().then(function(stock) {
                        noblox.groupPayout({ group: groupID, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                        embed.setColor('#00ff1a')
                        embed.setTitle("Purchase complete, your funds have been sent!")
                        embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                        embed.setDescription(`**${input_val} Robux** has been sent to **${input_name}**. Please leave a vouch in <#724694258128257187>!`)
                        embed.setThumbnail('https://cdn.discordapp.com/attachments/571908659043631104/740045820430385202/kindpng_4312134.png')
                        embed.setTimestamp()
                        embed.setFooter('RBXShop Sales');
                        message.channel.send(embed);
                        message.delete({timeout: 1000})
                    });
                });
            }).catch(err => {
                embed.setColor('#f54242')
                embed.setTitle("Error Caught")
                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                embed.setDescription('Failed to send funds, cookie is either invalid or user not found.')
                embed.setThumbnail('https://cdn.discordapp.com/attachments/571908659043631104/740041143143628850/error-48242.png')
                embed.setTimestamp()
                embed.setFooter('RBXShop Sales');
                message.channel.send(embed);
            });
        }
    }
}