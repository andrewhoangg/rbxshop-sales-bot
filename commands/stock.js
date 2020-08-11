const fetch = require("node-fetch");
const Discord = require('discord.js');
var numeral = require('numeral');

const groupID = 5442115;

module.exports = {
    name: 'stock',
    description: 'grabs stock from group funds',
    execute (message, args)
    {
        fetch(`https://economy.roblox.com/v1/groups/${groupID}/currency/`).then(function(response) {
            response.text().then(function(stock) {
                const embed = new Discord.MessageEmbed()
                var parsedstock = JSON.parse(stock)['robux'];

                if (parsedstock === 0)
                {
                    embed.setColor('#ff7f00')
                    embed.setTitle('💰 Current Stock (LIVE): **RESTOCKING!**')
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000962048030/outofstock.png')
                    embed.setDescription("Oops! Due to high demand, we're currently out of stock! Restocks usually occur every few hours, it depends when our funds get unpended. If you would like to purchase, please create a ticket in #purchase-robux. Make sure to @ <@490427270624968734> or <@699361519535915149> in your ticket for faster response!")
                    embed.setThumbnail('https://images.rbxcdn.com/9281912c23312bc0d08ab750afa588cc.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');   
                }
                else
                {
                    embed.setColor('#00ff1a')
                    embed.setTitle('💰 Current Stock (LIVE): **' + numeral(parsedstock).format('0,0') + '** 💰')
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription('We currently have robux in stock! If you would like to purchase, please create a ticket in #purchase-robux. Make sure to <@490427270624968734> or <@699361519535915149> in your ticket for faster response!')
                    embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');   
                }
            message.delete({timeout: 1000})
            message.channel.send(embed)
            .then(msg => {
                msg.delete({ timeout: 10000 })
              })
        });
      });
    }
}