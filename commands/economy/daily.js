const Discord = require('discord.js'),
  superagent = require('superagent'),
  mongoose = require('mongoose'),
  emeralds = require('../../models/emeralds.js'),
  ms = require('ms'),
  humanizeDuration = require("humanize-duration");


exports.run = async (client, message, args, tools) => {
    const Emeralds = require('../../models/emeralds.js')
    var coinadd = Math.floor(Math.random() * 32 + 48);
    const data = await Emeralds.findOne({
        userID: message.author.id
    });
    if (!data) {
        message.channel.send('Hold on, creating records for you since it\'s your first time using this bot')
        let newData = new Emeralds({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            emeralds: coinadd,
            lastclaim: message.createdTimestamp,
            vault: 0,
            capacity: 180
        })
        newData.save();

        const embed = new Discord.MessageEmbed()
            .setColor("#00FF80")
            .addField(`Daily`, `You got ${coinadd} <:emerald:834856709011931147>!`)
            .setTimestamp()
        message.channel.send({ embed })
        return;
    }
    else {
        var lastclaimed = parseFloat(data.lastclaim)
        if (message.createdTimestamp - lastclaimed < 86400000) {
            message.channel.send(`Please wait ${humanizeDuration(86400000 - (message.createdTimestamp - lastclaimed))
                } before claiming again.`)
            return;
        }
        var myquery = { userID: message.author.id };
        let newemeralds = data.emeralds + coinadd
        var newvalues = { $set: { emeralds: newemeralds, lastclaim: message.createdTimestamp } };
        Emeralds.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            const embed = new Discord.MessageEmbed()
                .setColor("#00FF80")
                .addField(`Daily`, `You got ${coinadd} <:emerald:834856709011931147>!`)
                .setTimestamp()
            message.channel.send({ embed })
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 0
};

exports.help = {
    name: 'daily',
    description: 'Claim your daily emeralds for the day!',
    usage: 'daily',
};