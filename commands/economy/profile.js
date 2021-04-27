const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
const iteminfo = require('../../assets/items.json')

function getworth(item) {
    return iteminfo[item].worth
}

function getname(item) {
    return iteminfo[item].name
}
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
            .setAuthor(user.username + "'s profile'")
            .setColor("#00FF80")
            .addField("Health", "<:hf:836685182516985927>".repeat(10) + "\n(Coming soon!)")
            .addField("Net Worth", "0<:emerald:834856709011931147>")
            .addField("Pickaxe", "Wooden Pickaxe", true)
            .addField("Total Item Count", "0 items\n0 unique items", true)
        message.channel.send(embed)


    }
    else {
        let totalinv = 0
        let uitemcount = 0
        let itemcount = 0
        let inv = client.database.get(`inventories.${user.id}`)
        if (inv != undefined) {
            Object.keys(inv).forEach(async (k) => {
                totalinv += inv[k] * getworth(k)
                itemcount += inv[k]
                uitemcount++
            });
        }
        let net = eval((data.emeralds + data.vault + totalinv).toString())
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + "'s profile")
            .setColor("#00FF80")
            .addField("Health", "<:hf:836685182516985927>".repeat(10) + "\n(Coming soon!)")
            .addField("Net wealth", net + " <:emerald:834856709011931147>\n◽ Pocket: " + data.emeralds + "<:emerald:834856709011931147>\n◽ Vault: " + data.vault + "<:emerald:834856709011931147>\n◽ Items: " + totalinv + "<:emerald:834856709011931147>")
            .addField("Pickaxe", getname(data.pickaxe + "_pickaxe"), true)
            .addField("Total Item Count", itemcount + " items\n" + uitemcount + " unique items", true)
        message.channel.send(embed)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "profile",
    description:
        "Check the profile of someone or yourself",
    usage: "profile <optional: mention or userid>",
};
