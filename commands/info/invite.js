const Discord = require("discord.js")

exports.run = async (client, message, args, tools) => {
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setTitle("Invite me")
        .setURL("https://discord.com/oauth2/authorize?client_id=812915477625438208&scope=bot+applications.commands&guild_id=undefined&permissions=8")
        .setTimestamp()
    await message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
};

exports.help = {
    name: "invite",
    description:
        "Gives you an invite link.",
    usage: "invite",
};
