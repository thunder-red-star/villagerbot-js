const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Emeralds = require('../../models/emeralds.js');

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

exports.run = async (client, message, args, tools) => {
    let user = message.mentions.users.first();
    if (user === undefined) {
        let userid = message.content.split(" ").slice(1, 2).join("")
        user = await client.users.fetch(userid)
        if (user === undefined) {
            message.channel.send("Please provide an actual mention or id!")
        }

    }
    let emeralds = parseInt(message.content.split(" ").slice(2, 3).join(""))
    if (typeof emeralds == "string") {
        return "Numbers only! Or would you like to give them letters, you plebord?"
    }
    let data = await Emeralds.findOne({
        userID: user.id
    });
    const giver = await Emeralds.findOne({
        userID: message.author.id
    });
    if (!giver) {
        return message.channel.send("You don't have any emeralds, go mine!")
    }
    if (!data) {
        message.channel.send('Creating records for that person...')
        let newData = new Emeralds({
            _id: mongoose.Types.ObjectId(),
            userID: user.id,
            emeralds: 0,
            lastclaim: 0,
            vault: 0,
            capacity: 180,
            pickaxe: "wood"
        })
        newData.save();
        let data = await Emeralds.findOne({
            userID: user.id
        });

    }
    if (giver.emeralds < emeralds) {
        return message.channel.send("You don't have that many emeralds! You have " + giver.emeralds + "<:emerald:834856709011931147> while you wanted to give " + emeralds + "<:emerald:834856709011931147>.")
    }
    if (emeralds < 0) {
        return message.channel.send("How are you gonna give someone that many emeralds? Because you're stealing from them by giving them negative emeralds.")
    }
    if (isInt(emeralds) == false) {
        return message.channel.send("You're not skilled enough to break emeralds apart, they'd be worthless anyway...")
    }
    if (emeralds > 5000) {
        message.channel.send("Would you really like to give " + emeralds + "<:emerald:834856709011931147> to " + user.username + "?\nPlease reply with \"yes\" or \"no\"")
        let filter = m => m.author.id == message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 30000 });
        collector.on('collect', async m => {
            console.log(m.content);
            if (m.content == "yes" || m.content == "y" || m.content == "1") {
                var myquery = { userID: user.id };
                let newems = emeralds + data.emeralds || 0
                var newvalues = { $set: { emeralds: newems } };
                await Emeralds.updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                });
                var myquery1 = { userID: message.author.id };
                let newems1 = giver.emeralds - emeralds
                var newvalues1 = { $set: { emeralds: newems1 } };
                await Emeralds.updateOne(myquery1, newvalues1, function(err, res) {
                    if (err) throw err;
                    const embed = new Discord.MessageEmbed()
                        .setColor("#00FF80")
                        .setDescription(`You successfully gave ${user.tag} ${emeralds}<:emerald:834856709011931147>!`)
                        .setTimestamp()
                    m.channel.send({ embed })
                });
            }
            else {
                return message.channel.send("Cancelled.")
            }

        })
    } else {
        var myquery = { userID: user.id };
        let newems = emeralds + data.emeralds || 0
        var newvalues = { $set: { emeralds: newems } };
        await Emeralds.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
        var myquery1 = { userID: message.author.id };
        let newems1 = giver.emeralds - emeralds
        var newvalues1 = { $set: { emeralds: newems1 } };
        await Emeralds.updateOne(myquery1, newvalues1, function(err, res) {
            if (err) throw err;
            const embed = new Discord.MessageEmbed()
                .setColor("#00FF80")
                .setDescription(`You successfully gave ${user.tag} ${emeralds}<:emerald:834856709011931147>!`)
                .setTimestamp()
            message.channel.send({ embed })
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 10

};

exports.help = {
    name: 'give',
    description: 'Give someone stuff, with emeralds or items (coming soon)',
    usage: 'give <user or id> money',
};