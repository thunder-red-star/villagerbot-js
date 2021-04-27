const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gets_emerald(pickaxe) {
    if (pickaxe == "wood") {
        return (randint(1, 5) == 1)
    }
    if (pickaxe == "stone") {
        return (rand(1, 4) == 1)
    }
    if (pickaxe == "iron") {
        return (randint(1, 7) <= 2)
    }
    if (pickaxe == "gold") {
        return (randint(1, 3) == 1)
    }
    if (pickaxe == "diamond") {
        return (randint(1, 2) == 2)
    }
    if (pickaxe == "netherite") {
        return (randint(1, 6) <= 4)
    }
}

function how_many(userid, client) {
    let inv = client.database.get("inventories." + userid)
    if (inv["fortune_iii"] > 0) {
        return randint(1, 4)
    }
    else {
        if (inv["fortune_ii"] > 0) {
            return randint(1, 3)
        }
        else {
            if (inv["fortune_i"] > 0) {
                return randint(1, 2)
            }
            else {
                return 1
            }
        }
    }
}

let actions = [
    "dug up ",
    "mined up ",
    "found ",
    "obtained ",
]

let actionas = [
    "stupid ",
    "dumb ",
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
            capacity: 180,
            pickaxe: "wood"
        })
        newData.save();
    }
    let pickaxe
    pickaxe = data.pickaxe || wood
    if (gets_emerald(pickaxe)) {
        let moreems = how_many(message.author.id, client)
        let embed = new Discord.MessageEmbed()
            .setColor("#00FF80")
            .setDescription("You " + randomthing(actions) + moreems + " emeralds <:emerald:834856709011931147>.")
        await message.channel.send(embed)
        const data = await Emeralds.findOne({
            userID: message.author.id
        });
        if (!data) {
            message.channel.send('Hold on, creating records for you since it\'s your first time using this bot')
            let newData = new Emeralds({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                emeralds: moreems,
                lastclaim: 0,
                vault: 0,
                capacity: 180,
                pickaxe: "wood"
            })
            newData.save();
        }
        else {
            var myquery = { userID: message.author.id };
            let newEmeralds = data.emeralds + moreems
            var newvalues = { $set: { emeralds: newEmeralds } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });
        }
    }
    else {
        let embed = new Discord.MessageEmbed()
            .setColor("#00FF80")
            .setDescription("You " + randomthing(actions) + randint(1, 6).toString() + " " + randomthing(actionas) + randomthing(gunk) + ".")
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
