const noblox = require('noblox.js');
const fetch = require("node-fetch");

const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()

const numeral = require('numeral');

module.exports = {
    name: 'convert',
    description: 'stores useful links',
    execute (message, args)
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
                embed.setFooter('RBXShop Sales');
            }
            else 
            {
                embed.setColor('#00ff1a')
                embed.setTitle(input_val + " Robux at a rate of 0.0055/1 is " + numeral(input_val * rate).format('$0,0.00') + " USD!")
                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                embed.setTimestamp()
                embed.setFooter('RBXShop Sales'); 
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
                embed.setFooter('RBXShop Sales');
            }
            else
            {
                embed.setColor('#00ff1a')
                embed.setTitle("$" + input_val + " USD can get you " + numeral(Math.round(input_val * rate2)).format('0,0') + " Robux!")
                embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                embed.setDescription('#purchase-robux | Accepted Payment Methods: PayPal, Zelle, CashApp, Venmo, Credit/Debit, Bitcoin, Amazon')
                embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                embed.setTimestamp()
                embed.setFooter('RBXShop Sales');
            }
        }
        message.delete({timeout: 1000})
        message.channel.send(embed)
        .then(msg => {
            msg.delete({ timeout: 10000 })
          })
    }
}