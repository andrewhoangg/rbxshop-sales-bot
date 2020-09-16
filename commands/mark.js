module.exports = {
    name: 'mark',
    description: 'updates ticket status',
    execute (message, args)
    {
        const input_type = args[0];
        const input_val = args[1];
        const input_val2 = args[2];

        if(message.member.roles.cache.has('746112821904801913'))
        {
            switch (input_type)
            {
                case "owe":
                    message.channel.setName(`owe-${input_val}`)
                break;
                default:
                {
                    message.reply("Error, invalid arguments");
                }
            }
        }
        else { return }
        message.delete({timeout: 1000})
    }
}