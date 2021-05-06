const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    settings = require('../../models/settings.js')

function num_to_dif(num) {
    if (num == 0) {
        return "Peaceful"
    }
    if (num == 1) {
        return "Easy"
    }
    if (num == 2) {
        return "Normal"
    }
    if (num == 3) {
        return "Hard"
    }
}

function dif_to_num(dif) {
    if (dif == "peaceful" || dif == "p") {
        return 0
    }
    if (dif == "easy" || dif == "e") {
        return 1
    }
    if (dif == "normal" || dif == "n") {
        return 2
    }
    if (dif == "hard" || dif == "h") {
        return 3
    }
}
valid = ["peaceful","easy","normal","hard","p","e","n","h",0,1,2,3]
words = ["peaceful","easy","normal","hard","p","e","n","h"]
exports.run = async (client, message, args, tools) => {
    if (!args[0]) {
        const Settings = require('../../models/settings.js'),
            data = await Settings.findOne({
                guildID: message.guild.id
            });
        if (!data) {
            message.channel.send('This guild has no settings, but the difficulty is Easy!')
            let newData = new Settings({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                prefix: "v!!",
                difficulty: 1,
                ignore: ""
            })
            newData.save();
        }
        else {
            return message.reply(`The current difficulty for ${message.guild.name} is ${num_to_dif(data.difficulty)}`)
        }
    } else {
        let diff = message.content.split(" ").slice(1, 2).join("").toLowerCase()
    if (!valid.includes(diff)) {return message.channel.send("That's not a valid difficulty!")}
    if (words.includes(diff)) {
        diff = dif_to_num(diff)
    }
        const Settings = require('../../models/settings.js'),
            data = await Settings.findOne({
                guildID: message.guild.id
            });
        if (!data) {
            message.channel.send('This guild has no settings, please wait while I create some with your difficulty...')
            let newData = new Settings({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                prefix: "v!!",
                difficulty: diff,
                ignore: ""
            })
            newData.save();
            let successEmbed = new Discord.MessageEmbed()
                .setTitle('Difficulty')
                .setColor("#00FF80")
                .setDescription(`Success! The difficulty for ${message.guild.name} is now \`${num_to_dif(diff)}\``)
            message.channel.send(successEmbed)
        } else {
            var myquery = { guildID: message.guild.id },
                newvalues = { $set: { difficulty: diff } };
            Settings.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                let successEmbed = new Discord.MessageEmbed()
                    .setTitle('Difficulty')
                    .setColor("#00FF80")
                    .setDescription(`Success! The difficulty for ${message.guild.name} is now \`${num_to_dif(diff)}\``)
                message.channel.send(successEmbed)
            });
        }

    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    permLevel: 4
};

exports.help = {
    name: 'difficulty',
    description: 'Sets the difficulty of the server, which determines mob power and spawn rate, and chances of dangerous situations, in exchance for more emeralds.',
    usage: 'difficulty (string)',
};