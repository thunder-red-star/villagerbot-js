const Discord = require("discord.js"),
    superagent = require("superagent"),
    fs = require("fs"),
    modules = [
        "config",
        "economy",
        "fun",
        "info",
        "mc",
        "moderation",
        "owner"
    ];
const prefixs = require("../../models/settings.js")

function permlevel(input) {
    if (input == 5)
        return "Can only be used by owner of bot";
    else if (input == 4)
        return "Can only be used by guild owner";
    else if (input == 3)
        return "Manage Guild";
    else if (input == 2)
        return "Ban Members";
    else if (input == 1)
        return "Manage Messages";
    else return "Anyone can use this command!";
}
exports.run = async (client, message, args, tools) => {
    const Settings = require('../../models/settings.js'),
        data = await Settings.findOne({
            guildID: message.guild.id
        });
        let preficks
        if (!data) {preficks = "v!!"}
        else {preficks = data.prefix}
    if (!args[0]) {
        let categoryEmbed = new Discord.MessageEmbed()
            .setTitle("Help for Villager Bot JS")
            .setColor("#00FF80")
            .setDescription(
                "Welcome to Villager Bot JS!"
            )
            .setThumbnail("https://cdn.discordapp.com/avatars/812915477625438208/2ad42195c508d25ec607828c5a33f10c.png?size=1024")
            .addField("Configuration ⚙", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Configure the bot to your liking!\")\n\`" + preficks + "help config\`", true)
            .addField("Economy 💵", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Interact with the bot, gain emeralds, and be the richest villager!\")\n\`" + preficks + "help economy\`", true)
            .addField("Fun 🤣", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Use the bot to do fun and interesting stuff!\")\n\`" + preficks + "help fun\`", true)
            .addField("Info ℹ", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Get information about the bot, its creator, and help.\")\n\`" + preficks + "help info\`", true)
            .addField("Minecraft ⛏", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Use many useful Minecraft related commands such as name history and server ping.\")\n\`" + preficks + "help mc\`", true)
            .addField("Moderation 🔨", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Moderate your server with a wide range of useful moderation commands!\")\n\`" + preficks + "help mc\`", true)
            .setTimestamp()
            .setFooter("Made by ThunderRedStar#9374")
        message.channel.send(categoryEmbed);
    } else {
        if (modules.includes(args[0])) {
            fs.readdir(`commands/${args[0]}`, (err, files) => {
                let filesArray = [];
                if (err) console.error(err);
                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                if (jsfiles.length <= 0) {
                    message.channel.send(
                        "There are no commands in the directory " + args[0]
                    );
                    return;
                }

                jsfiles.forEach(f => {
                    let props = require(`../../commands/${args[0]}/${f}`);
                    filesArray.push(`\`${props.help.name}\``);
                });

                let commandslist = filesArray.join(", "),
                    listEmbed = new Discord.MessageEmbed()
                        .setTitle(`Villager Bot JS commands [${args[0]}]`)
                        .setColor("#00FF80")

                        .setDescription(commandslist + "\n\nUse `" + preficks + "help <command>` to see help for an individual command!")
                        .setTimestamp()
                        .setFooter("Made by ThunderRedStar#9374")

                message.channel.send(listEmbed);
            });
        } else {
            let command = args[0];
            if (client.commands.has(command)) {
                cmd = client.commands.get(command);
                let helpEmbed = new Discord.MessageEmbed()
                    .setTitle(`Help for command ${cmd.help.name}`)
                    .setColor("#00FF80")
                    .setDescription(
                        `Name: ${cmd.help.name}\nDescription: ${
                        cmd.help.description
                        }\nUsage: \`${cmd.help.usage}\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
                            cmd.conf.permLevel
                        )})`
                    )
                    .setFooter("CommandStorm")
                    .setTimestamp();
                message.channel.send(helpEmbed);
            } else if (client.aliases.has(command)) {
                cmd = client.commands.get(client.aliases.get(command));
                cmd = client.commands.get(command);
                let helpEmbed = new Discord.MessageEmbed()
                    .setTitle(`Help for command ${cmd.help.name}`)
                    .setColor("#00FF10")

                    .setDescription(
                        `Name: ${cmd.help.name}\nDescription: ${
                        cmd.help.description
                        }\nUsage: \`${cmd.help.usage}\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
                            cmd.conf.permLevel
                        )})\n\nPro tip: You can vote for the bot using \`c!vote\` and you can get coins for it!`
                    )
                    .setFooter("CommandStorm")
                    .setTimestamp();
                message.channel.send(helpEmbed);
            } else {
                return message.reply("That command doesn't exist!");
            }
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    permLevel: 0
};

exports.help = {
    name: "help",
    description:
        "Returns a list of categories of commands, a list of commands for a category, or help for a command itself.",
    usage: "help <command or category>",
    example: "help bot (returns list of commands for the bot category)"
};
