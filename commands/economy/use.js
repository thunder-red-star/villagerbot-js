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
    return message.channel.send("Coming soon!")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
};

exports.help = {
    name: "use",
    description:
        "Use an item.",
    usage: "use <item>",
};
