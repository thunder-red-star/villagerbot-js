const Discord = require("discord.js")

exports.run = async (client, message, args, tools) => {
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setTitle("Pickaxe Info")
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/5\n**Cost**: 0\n**Worth**: 0", true)
        .addField("Stone Pickaxe", "**Emerald Chance**: 1/4\n**Cost**: 32\n**Worth**: 8", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 2/7\n**Cost**: 128\n**Worth**: 32", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/3\n**Cost**: 512\n**Worth**: 128", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 1/2\n**Cost**: 2048\n**Worth**: 512", true)
        .addField("Wooden Pickaxe", "**Emerald Chance**: 2/3\n**Cost**: 8192\n**Worth**: 2048", true)
        .setFooter("Make sure to use the `shop` and the `buy` commands!")
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
