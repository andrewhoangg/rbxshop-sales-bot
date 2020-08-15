module.exports = {
    name: 'link',
    description: 'stores useful links',
    execute (message, args)
    {
        const input_linktype = args[0];

        if (message.member.roles.cache.has('732170807446339634'))
        {
            if (input_linktype === "group")
            {
                message.channel.send("https://www.roblox.com/groups/4050917/OFFICIAL-Panders-Community#!/about");
            }
            else if (input_linktype === "group2")
            {
                message.channel.send("https://www.roblox.com/groups/7082916/SnapeDaGamer#!/about");
            }
            else if (input_linktype === "group3")
            {
                message.channel.send("https://www.roblox.com/groups/7108857/roblox-fans#!/about");
            }
            else if (input_linktype === "group4")
            {
                message.channel.send("https://www.roblox.com/groups/7345267/unnamed#!/about");
            }
            else if (input_linktype === "ppqr")
            {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/730532175132491857/image0.png");
            }
            else if (input_linktype === "pp")
            {
                if (isNaN(args[1])){} else {
                    message.channel.send(`Please send $${args[1]} to **rbxshopbusiness@gmail.com** as friends **NOT GOODS/SERVICE!** Once done, please @ andrew. If you'd like to use a different currency other than USD, let us know!`);
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