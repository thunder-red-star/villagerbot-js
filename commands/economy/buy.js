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
function getbuyable(item) {
    return iteminfo[item].buyable
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
    if (!iteminfo.hasOwnProperty(item)) {
        return message.channel.send("That item doesn't exist, sorry.")
    }
    if (!iteminfo.hasOwnProperty(item)) {
        return message.channel.send("That item can't be bought!")
    }
    if (quantity < 1) {return message.channel.send("NO.")}
    quantity = parseInt(quantity)
    if (item.includes("pickaxe")) {
        if (item == "stone_pickaxe") {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds - getcost(item)
            var newvalues = { $set: { pickaxe: "stone" } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });

        }
        if (item == "iron_pickaxe") {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds - getcost(item)
            var newvalues = { $set: { pickaxe: "iron" } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });

        }
        if (item == "gold_pickaxe") {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds - getcost(item)
            var newvalues = { $set: { pickaxe: "gold" } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });

        }
        if (item == "diamond_pickaxe") {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds - getcost(item)
            var newvalues = { $set: { pickaxe: "diamond" } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });

        }
        if (item == "netherite_pickaxe") {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds - getcost(item)
            var newvalues = { $set: { pickaxe: "netherite" } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });

        }
    }
    if (getcost(item) * quantity > data.emeralds) {
        return message.channel.send("You don't have enough emeralds to buy " + quantity + " of " + getname(item) + " for " + getcost(item) + "<:emerald:834856709011931147> (You have " + data.emeralds + "<:emerald:834856709011931147>)")
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
