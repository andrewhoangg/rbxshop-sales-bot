const Discord = require('discord.js');

module.exports = {
    name: 'notify',
    description: 'notifies buyer to check ticket',
    async execute (message, args)
    {
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return message.member.cache.has(mention);
            }
        }
        
        const user = getUserFromMention(args[0]);
        
        if(message.member.roles.cache.has('732170807446339634'))
        {
            if (!user) { message.reply("invalid user"); }
            else
            {
                return message.user.send("Your message here.")
            }
        }
        else { return }
        message.delete({timeout: 1000})
    }
}