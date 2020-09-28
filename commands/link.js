module.exports = {
    name: 'link',
    description: 'stores useful links',
    execute(message, args) {
        const input_linktype = args[0];

        if (message.member.roles.cache.has('746112821904801913')) {
            if (input_linktype === "group") {
                message.channel.send("gl");
            }
            else if (input_linktype === "pp") {
                if (isNaN(args[1])) { } else {
                    message.channel.send(`Please send **$${args[1]}** to **axialsolutionsllc@gmail.com** Once done, please @ andrew. If you'd like to use a different currency other than USD, let us know!`);
                }
            }
            else if (input_linktype === "cashapp") {
                message.channel.send("");
            }
            else if (input_linktype === "venmo") {
                message.channel.send("");
            }
            else {
                message.reply("Invalid argument! Usage: ```!link [group/pp/venmo/cashapp]```")
            }
            message.delete({ timeout: 500 })
        }
    }
}