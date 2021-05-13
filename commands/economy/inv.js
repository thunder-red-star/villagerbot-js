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

function getname(item) {
    return iteminfo[item].name
}
exports.run = async (client, message, args, tools) => {
    var embeds = [];

    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        if (!userid) {userid = message.author.id}
        user = await client.users.fetch(userid)
        if (user === undefined) {
            user = message.author
        }
    }
    let list = []
    let inv = client.database.get(`inventories.${user.id}`)
    if (inv == undefined) { return message.channel.send("This person has no items. ") }
    Object.keys(inv).forEach(async (k) => {
        list.push("`" + inv[k] + "x`" + ' **' + getname(k) + "**" + " (" + getworth(k) + "<:emerald:834856709011931147>)");
    });
    let newlist = []
    for (x = 0; x < list.length; x += 10) {
        await newlist.push(list.slice(x, x + 10).join("\n"))
    }
    console.log(newlist)
    newlist.forEach(async (item) => {
        await embeds.push(new Discord.MessageEmbed().setTitle(user.username + "'s inventory").setDescription(item))
    });
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setTimestamp()
        .setColor("#00FF80")
        .build();



};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["inventory"],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "inv",
    description:
        "Check inventory of yourself or someone else.",
    usage: "inv <optional: mention or userid>",
};
