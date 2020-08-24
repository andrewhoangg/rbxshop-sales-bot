module.exports = {
    name: 'link',
    description: 'stores useful links',
    execute (message, args)
    {
        const input_linktype = args[0];

        if (message.member.roles.cache.has('745019387786035213'))
        {
            if (input_linktype === "group")
            {
                message.channel.send("https://www.roblox.com/groups/4050917/OFFICIAL-Panders-Community#!/about");
            }
            else if (input_linktype === "ppqr")
            {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/730532175132491857/image0.png");
            }
            else if (input_linktype === "pp")
            {
                if (isNaN(args[1])){} else {
                    message.channel.send(`Please send $${args[1]} to **rbxshopbusiness@gmail.com** __as friends__ **NOT GOODS/SERVICE!** Once done, please @ andrew. If you'd like to use a different currency other than USD, let us know!`);
                }     
            }
            else if (input_linktype === "cashapp")
            {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510511708373064/Screenshot_20200703-002028.png");
            }
            else if (input_linktype === "venmo")
            {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510581862170664/Screenshot_20200703-002051.png");
            }
            else
            {
                message.reply("Invalid argument! Usage: ```!link [group/group2/group3/pp/venmo/cashapp]```")
            }
            message.delete({timeout: 500})
        }
    }
}