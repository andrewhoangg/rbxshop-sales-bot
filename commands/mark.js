module.exports = {
    name: 'mark',
    description: 'updates ticket status',
    execute (message, args)
    {
        const input_type = args[0];
        const input_val = args[1];

        if(message.member.roles.cache.has('745026228796391554'))
        {
            if (input_type === "paid")
            {
                message.channel.setName(`owe-${input_val}`)
            }
            else if (input_type === "complete")
            {
                message.channel.setName("robux-paid")
            }
        }
        else { return }
        message.delete({timeout: 1000})
    }
}