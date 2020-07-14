module.exports = {
    name: 'send',
    description: "Group payout via noblox.js",
    execute(username, amount)
    {
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
    }
}