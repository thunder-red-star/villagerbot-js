const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
const Pagination = require('discord-paginationembed');
const iteminfo = require('../../assets/items.json')

function object_length(object) {
    var key, count = 0;
    for (key in iteminfo) {
        count++
    }
    return count
}
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getworth(item) {
    return iteminfo[item].worth
}

exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.fetch(userid)
        if (user === undefined) {
            user = message.author
        }
    }
    let quantity = message.content.split(" ").slice(2, 3).join("")
    let item = message.content.split(" ").slice(3).join(" ")
    try {
        client.database.addItem(user.id, item, quantity, `inventories.${user.id}.${item}`)
    } catch (err) { message.channel.send("An error occurred: ```" + err + "```")
    console.log(err) }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 5
};

exports.help = {
    name: "additem",
    description:
        "Adds a specified item from items.json to someone's inventory",
    usage: "additem <user> <amount> <item>",
};
