module.exports = {
    name: 'close',
    description: 'updates status channel',
    execute(message) {
        if (message.member.roles.cache.has('746112821904801913')) {
            message.guild.channels.cache.get("746112848073195588").setName("❌ SALES: OFFLINE ❌");
        }
        else { return }
        message.delete({ timeout: 1000 })
    }
}