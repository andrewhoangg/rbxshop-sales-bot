module.exports = {
    name: 'link',
    description: 'stores useful links',
    execute(message, args) {
        const input_linktype = args[0];

        if (message.member.roles.cache.has('746112824388092038')) {
            if (input_linktype === "group") {
                message.channel.send("https://www.roblox.com/groups/4050917/OFFICIAL-Panders-Community#!/about");
            }
            else if (input_linktype === "pp") {
                if (isNaN(args[1])) { } else {
                    message.channel.send(`Please send $${args[1]} to **axialpayment@gmail.com** **__AS FRIENDS NOT GOODS__** Once done, please @ andrew. If you'd like to use a different currency other than USD, let us know!`);
                }
            }
            else if (input_linktype === "cashapp") {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510511708373064/Screenshot_20200703-002028.png");
            }
            else if (input_linktype === "venmo") {
                message.channel.send("https://cdn.discordapp.com/attachments/571908659043631104/728510581862170664/Screenshot_20200703-002051.png");
            }
            else {
                message.reply("Invalid argument! Usage: ```!link [group/pp/venmo/cashapp]```")
            }
            message.delete({ timeout: 500 })
        }
    }
}