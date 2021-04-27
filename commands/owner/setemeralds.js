const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Emeralds = require('../../models/emeralds.js');

exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.cache.get(userid)
        if (user === undefined) {
            return message.channel.send("Please provide an actual mention or id!")
        }
    }
    if (!args[1]) {
        return message.channel.send('You have to give them an actual number of emeralds!')
    }
    else {
        const data = await Emeralds.findOne({
            userID: message.mentions.users.first().id
        });
        if (!data) {
            message.channel.send('Creating records for that person...')
            let newData = new Emeralds({
                _id: mongoose.Types.ObjectId(),
                userID: user.id,
                emeralds: parseInt(args[1]),
                lastclaim: 0,
                vault: 0,
                capacity: 180,
                pickaxe: "wood"
            })
            newData.save();
        }
        else {
            var myquery = { userID: user.id};
            let newemeralds = parseInt(args[1])
            var newvalues = { $set: { emeralds: newemeralds } };
            Emeralds.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                const embed = new Discord.MessageEmbed()
                    .setColor("#00FF80")
                    .addField(`Set Emeralds`, `The user ${message.mentions.users.first().tag}'s now has ${args[1]}<:emerald:834856709011931147>`)
                    .setTimestamp()
                message.channel.send({ embed })
            });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 5
};

exports.help = {
    name: 'setemeralds',
    description: 'Sets emeralds for someone.',
    usage: 'setemeralds @mention <number>',
};