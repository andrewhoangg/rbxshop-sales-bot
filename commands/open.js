module.exports = {
    name: 'open',
    description: 'updates status channel',
    execute (message, args)
    {
        if(message.member.roles.cache.has('745016271292071998'))
        {
            message.guild.channels.cache.get("745025995798609930").setName("✅ SALES: ONLINE ✅");
        }
        else { return }
        message.delete({timeout: 1000})
    }
}