/* Requiring Discord.js */

const Discord = require('discord.js');
const numeral = require('numeral');


module.exports = {
    name: 'convert',
    description: 'stores useful links',
    execute(message, args) {
        const embed = new Discord.MessageEmbed();

        /* Defining Input Arguments */
        const input_type = args[0];
        const input_val = args[1];

        let rate = 0.0055; /*0.06 per 1 R$*/
        let rate2 = 181.8181818181818; /* <-- per $1 */

        if (isNaN(input_val)) {
            embed.setColor('#f54242')
            embed.setTitle("Error: Invalid argument")
            embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
            embed.setDescription('Usage: !convert robux amount\n !convert usd amount')
            embed.setTimestamp()
            embed.setFooter('RBXShop Sales');
        }
        else {
            switch (input_type) {
                case 'robux': /* Converts Robux to USD @ rate of 5.50/1K */
                    embed.setColor('#00ff1a')
                    embed.setTitle(input_val + " Robux at a rate of 0.0055/1 is " + numeral(input_val * rate).format('$0,0.00') + " USD!")
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription('<#753679761397514260> | Accepted Payment Methods: ~~PayPal~~, Zelle, CashApp, Venmo, Apple Pay, Google Pay')
                    embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');
                    break;

                case 'usd': /* Converts USD to Robux @ rate of 5.50/1K */
                    embed.setColor('#00ff1a')
                    embed.setTitle("$" + input_val + " USD can get you " + numeral(Math.round(input_val * rate2)).format('0,0') + " Robux!")
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription('<#753679761397514260> | Accepted Payment Methods: ~~PayPal~~, Zelle, CashApp, Venmo, Apple Pay, Google Pay')
                    embed.setThumbnail('https://i.pinimg.com/originals/4d/06/56/4d0656e77aecce07e126af81be09dd39.png')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');
                    break;

                default:
                    embed.setColor('#f54242')
                    embed.setTitle("Error: Invalid argument")
                    embed.setAuthor('RBXShop Sales', 'https://cdn.discordapp.com/attachments/571908659043631104/732149000412594237/instock.png')
                    embed.setDescription('Usage: !convert robux amount\n !convert usd amount')
                    embed.setTimestamp()
                    embed.setFooter('RBXShop Sales');
                    break;
            }
        }

        message.channel.send(embed)
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
    }
}