module.exports = {
    name: 'open',
    description: 'updates status channel',
    execute (message, args)
    {
        if(message.member.roles.cache.has('732170807446339634'))
        {
            message.guild.channels.cache.get("732016195112403116").setName("✅ SALES: ONLINE ✅");
        }
        else { return }
        message.delete({timeout: 1000})
    }
}