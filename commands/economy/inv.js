const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.run = async (client, message, args, tools) => {
    var embeds = [];

    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            user = message.author
        }
    }
    let inv = client.database.get(`inventories.${user.id}`)
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .setTitle('Shop')
        .setDescription('Buy an item with \`buy <id>!\`')
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
