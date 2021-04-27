const Discord = require("discord.js")

exports.run = async (client, message, args, tools) => {
    const Settings = require('../../models/settings.js'),
          data = await Settings.findOne({
            guildID: message.guild.id
        });
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setTitle("Pickaxe Info")
        .setDescription("Use the `" + data.prefix + "buy` and `" + data.prefix + "shop` commands to obtain these pickaxes!")
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/5\n**Cost**: 0<:emerald:834856709011931147>\n**Worth**: 0<:emerald:834856709011931147>", true)
        .addField("Stone Pickaxe", "**Emerald Chance**: 1/4\n**Cost**: 32<:emerald:834856709011931147>\n**Worth**: 8<:emerald:834856709011931147>", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 2/7\n**Cost**: 128<:emerald:834856709011931147>\n**Worth**: 32<:emerald:834856709011931147>", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/3\n**Cost**: 512<:emerald:834856709011931147>\n**Worth**: 128<:emerald:834856709011931147>", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/2\n**Cost**: 2048<:emerald:834856709011931147>\n**Worth**: 512<:emerald:834856709011931147>", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 2/3\n**Cost**: 8192<:emerald:834856709011931147>\n**Worth**: 2048<:emerald:834856709011931147>", true)
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
    name: "pickaxeinfo",
    description:
        "Returns some information about the types of pickaxes in this bot.",
    usage: "pickaxeinfo",
};
