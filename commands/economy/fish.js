const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function how_fast(userid, client) {
    let inv = client.database.get("inventories." + userid)
    if (inv["lure_iii"] > 0) {
        return randint(1, 7) * 1000
    }
    else {
        if (inv["lure_ii"] > 0) {
            return randint(2, 10) * 1000
        }
        else {
            if (inv["lure_i"] > 0) {
                return randint(3, 12) * 1000
            }
            else {
                return randint(4, 15) * 1000
            }
        }
    }
}

let actions = [
    "fished up ",
    "reeled up ",
    "found ",
    "obtained ",
]

let firstthing = [
    "You go fishing...",
    "You cast out your fishing rod...",
    "You cast out your fishing line..."
]

let actionas = [
    "stupid ",
    "dumb "
]

let gunk = [
    "pair of leather boots",
    "dirt block",
    "bone",
    "piece of rotten flesh",
    "gravel",
    "lily pad"
]

exports.run = async (client, message, args, tools) => {
    let msg = message
    let inv = client.database.get("inventories." + message.author.id)
    if (!inv["fishing_rod"] || inv["fishing_rod"] == 0) {
        return message.channel.send("Dude, you don't have a fishing rod! Go buy one!")
    }
    let embed = new Discord.MessageEmbed()
        .setDescription(randomthing(firstthing))
        .setColor("#00FF80")

    let messagesent = await message.channel.send(embed)
    await sleep(how_fast(msg.author.id, client))
    messagesent.react("🎣")
    message.channel.send("Quick! React with 🎣 within 5 seconds to catch the fish!")
    const filter = (reaction, user) => {
        return ['🎣'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    collector = new Discord.ReactionCollector(messagesent, filter, { max: 1, time: 5000, errors: ['time'] })
    collector.on("collect", async (react) => {
        client.database.addItem(message.author.id, "cod", 1, `inventories.${message.author.id}.cod`)
        let embed = new Discord.MessageEmbed()
            .setDescription("You got 1 cod!")
            .setColor("#00FF80")

        let messagesent = await message.channel.send(embed)
    })

    collector.on("end", async () => {
        if (!collector.collected.first()) {
            return message.channel.send("The fish is gone kiddo, react faster next time 😂")
        }
    })

};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    cooldown: 15,
    permLevel: 5
};

exports.help = {
    name: "fish",
    description:
        "Go fishing and get fish!",
    usage: "fish",
};
