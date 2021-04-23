const Discord = require('discord.js'),
    settings = require('../settings.json'),
    fs = require("fs"),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    Settings = require("../models/settings.js"),
    humanizeDuration = require("humanize-duration"),
    cooldowns = new Discord.Collection(),
    axios = require('axios')

module.exports = async message => {
    let client = message.client;
    if (message.channel.type == "dm") return;

    let guildSettings = await Settings.findOne({
        guildID: message.guild.id
    })
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
  if (!blacklist[message.author.id]) {
        blacklist[message.author.id] = {state: false}
      };

      if (blacklist[message.author.id].state === true) return;

    if (message.author.bot || message.webhookID) return;

    if (message.content.startsWith('spamdm')) {
        let count = message.content.split(" ").slice(1,2).join("")
        let person = message.content.split(' ').slice(2,3).join("")
        let messageSend = message.content.split(' ').slice(3).join(" ")
        let personObject = await client.users.fetch(person)
        message.channel.send(`spamming ${personObject.tag} with the message \"${messageSend}\", ${count} times`)
                for (var i = 0; i < count; i++) {

        personObject.send(messageSend)}
    }

    if (!guildSettings) {
        let prefix = settings.prefix;
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase(),
            params = message.content.split(' ').slice(1),
            perms = client.elevation(message),
            cmd;


        if (client.commands.has(command))
            cmd = client.commands.get(command);
        else if (client.aliases.has(command))
            cmd = client.commands.get(client.aliases.get(command));
        if (cmd) {
            if (!cooldowns.has(cmd.help.name))
                cooldowns.set(cmd.help.name, new Discord.Collection());

            const now = Date.now(),
                timestamps = cooldowns.get(cmd.help.name),
                cooldownAmount = cmd.conf.cooldown * 1000 || 0;
            if (message.author.id != settings.ownerid) {
                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now);
                        return message.reply(`Please wait ${humanizeDuration(timeLeft)} before reusing the \`${command}\` command.`);
                    }
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            if (perms < cmd.conf.permLevel) {
                return console.log(`Command: ${settings.prefix + cmd.help.name} - Guild: ${message.guild.name} ID: ${message.guild.id}`)
            }
            try {
                cmd.run(client, message, params, perms);
                message.react('811296394324869150')
                console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)

            }
            catch (error) {
                console.log(error)
                message.react('811296689783832617')
            }
        }
        else message.react('811294703626223687');
    } else {
        let prefix1 = guildSettings.prefix;
        if (!message.content.startsWith(prefix1)) return;
        let command = message.content.split(' ')[0].slice(prefix1.length),
            params = message.content.split(' ').slice(1),
            perms = client.elevation(message),
            cmd;


        if (client.commands.has(command))
            cmd = client.commands.get(command);
        else if (client.aliases.has(command))
            cmd = client.commands.get(client.aliases.get(command));
        if (cmd) {
            if (!cooldowns.has(cmd.help.name))
                cooldowns.set(cmd.help.name, new Discord.Collection());

            const now = Date.now(),
                timestamps = cooldowns.get(cmd.help.name),
                cooldownAmount = cmd.conf.cooldown * 1000 || 0;
            if (message.author.id != settings.ownerid) {

                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now);
                        return message.reply(`Please wait ${humanizeDuration(timeLeft)} before reusing the \`${command}\` command.`);
                    }
                }
            }

            if (perms < cmd.conf.permLevel) {
                return console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)

            }
            try {

                cmd.run(client, message, params, perms);
                message.react('811296394324869150')
                console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
            catch (err) {
                console.log(err)
                message.react('811296689783832617')
            }
        } else message.react('811294703626223687');

    }
};
