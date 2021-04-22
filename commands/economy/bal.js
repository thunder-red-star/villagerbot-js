const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let actions = [
    "dug up ",
    "mined up ",
    "found ",
    "obtained ",
]

let gunk = [
    "Lapis Lazuli",
    "dirt",
    "iron ore",
    "stone",
    "cobblestone",
    "andesite",
    "diorite",
    "granite",
    "diamond ore",
    "coarse dirt",
    "planks",
]
exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            user = message.author
        }
    }
    const data = await Emeralds.findOne({
        userID: user.id
    });
    if (!data) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + "'s emeralds'")
            .setColor("#00FF80")
            .setDescription("0 <:emerald:834856709011931147>")
            .addField("Pocket", "0 " + "<:emerald:834856709011931147>", true)
            .addField("Vault", "0/180 <:emerald:834856709011931147> (coming soon)", true)
        message.channel.send(embed)


    }
    else {
        let net = eval((data.emeralds + data.vault).toString())
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + "'s emeralds")
            .setColor("#00FF80")
            .setDescription("Net wealth: " + net + " <:emerald:834856709011931147>")
            .addField("Pocket", data.emeralds + " <:emerald:834856709011931147>", true)
            .addField("Vault", data.vault + "/" + data.capacity + " <:emerald:834856709011931147> (coming soon)", true)
        message.channel.send(embed)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["balance"],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "bal",
    description:
        "Check emeralds of yourself or someone else.",
    usage: "bal <optional: mention or userid>",
};
