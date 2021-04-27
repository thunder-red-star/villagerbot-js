const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
const iteminfo = require('../../assets/items.json')

function getcost(item) {
    return iteminfo[item].cost
}
function getname(item) {
    return iteminfo[item].name
}
exports.run = async (client, message, args, tools) => {
    const data = await Emeralds.findOne({
        userID: message.author.id
    });

    let quantity = message.content.split(" ").slice(2, 3).join("")
    if (!quantity) {
        quantity = 1
    }
    let item = message.content.split(" ").slice(1, 2).join(" ")
    if (getcost(item) > data.emeralds) {
        return message.channel.send("You don't have enough emeralds to buy " + getname(item) + " for " + getcost(item) + "<:emerald:834856709011931147> (You have " + data.emeralds + "<:emerald:834856709011931147>)")
    }
    client.database.addItem(message.author.id, item, quantity, `inventories.${message.author.id}.${item}`)
    var myquery = { userID: message.author.id };
    let newEmeralds = data.emeralds - getcost(item)
    var newvalues = { $set: { emeralds: newEmeralds } };
    Emeralds.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
    });
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setDescription("You successfully bought " + getname(item) + " for " + getcost(item) + "<:emerald:834856709011931147>")
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
};

exports.help = {
    name: "buy",
    description:
        "Buy an item that was in the shop. ",
    usage: "buy <id> <quantity>",
};
