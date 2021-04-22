const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint (min, max) {
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
    if (randint(1, 5) == 1) {
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setDescription("You " + randomthing(actions) + "1 emerald <:emerald:834856709011931147>.")
    await message.channel.send(embed)
    const data = await Emeralds.findOne({
        userID: message.author.id
    });
    if (!data) {
        message.channel.send('Hold on, creating records for you since it\'s your first time using this bot')
        let newData = new Emeralds({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            emeralds: 1,
            lastclaim: 0,
            vault: 0,
            capacity: 180
        })
        newData.save();
    }
    else {
        var myquery = { userID: message.author.id };
        let newEmeralds = data.emeralds + 1
        var newvalues = { $set: { emeralds: newEmeralds } };
        Emeralds.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    }
    }
    else {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF80")
        .setDescription("You " + randomthing(actions) + randint(1, 6).toString() + " " + randomthing(gunk) + ".")
    await message.channel.send(embed)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 2,
    permLevel: 0
};

exports.help = {
    name: "mine",
    description:
        "Go mining for a chance of emeralds! WIP",
    usage: "mine",
};
