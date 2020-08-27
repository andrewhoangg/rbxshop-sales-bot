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

        if (message.member.roles.cache.has('745026228796391554'))
        {
            noblox.getIdFromUsername(input_name).then(id => {  
                noblox.groupPayout({ group: groupID, member: [id], amount: [input_val], recurring: false , usePercentage: false}) 
                embed.setColor('#00ff1a')
                embed.setTitle("Purchase complete, your funds have been sent!")
                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                embed.setDescription(`**${input_val} Robux** has been sent to **${input_name}**. Please leave a vouch in <#745036117841150154>!`)
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
            /* Payout Log */
            embed.setColor('#00dcff')
            embed.setAuthor('RBXShop Payouts Log', 'https://cdn.iconscout.com/icon/free/png-512/log-file-1-504262.png')
            embed.setDescription(`**Robux sent by:** <@` + message.author + `> \n **Amount:** ${input_val} \n **Recipient Account:** ${input_name}`)
            embed.setTimestamp()
            embed.setFooter('RBXShop Sales');
            message.user.get('689231007932481550').send(embed);
        }
        else {return message.reply("Unauthorized");}
    }
}