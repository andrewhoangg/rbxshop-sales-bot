const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()

module.exports = {
    name: 'form',
    description: 'updates status channel',
    execute (message, args)
    {
        if(message.member.roles.cache.has('732170807446339634'))
        {
            embed.setColor('#00ff1a')
            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
            embed.setDescription("Thank you for being interested in RBXShop, please fill out this form and a seller will be right with you. \n\n Roblox Username: \n Amount: \n Payment Method (PayPal, Zelle, CashApp, Venmo, e-Transfer, Amazon): ")
            embed.setThumbnail('https://image.spreadshirtmedia.net/image-server/v1/compositions/T812A1PA3811PT17X49Y47D167531197FS2951/views/1,width=650,height=650,appearanceId=1/haha-yes-order-executed.jpg')
            embed.setTimestamp()
            embed.setFooter('RBXShop Sales');
            message.channel.send(embed);
        }
        else { return }
        message.delete({timeout: 1000})
    }
}