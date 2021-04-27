const Discord = require("discord.js"),
    client = new Discord.Client(),
    keepAlive = require('./server.js'),
    settings = require('./settings.json'),
    mongoose = require('mongoose'),
    chalk = require('chalk');
var express = require('express');
const Emeralds = require('./models/emeralds.js')
const Database = require('./Database/database');
client.database = new Database('../Database', 'database');

console.log(client.database.get("inventories.691009964570968144"))
modules = [
    "config",
    "economy",
    "fun",
    "info",
    "mc",
    "moderation",
    "owner"
],
    fs = require("fs");

require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection(),
    client.aliases = new Discord.Collection();

modules.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => {
        if (err) throw err;
        console.log(`[Commands] Loaded ${files.length} commands of module ${c}`);
        files.forEach(f => {
            const props = require(`./commands/${c}/${f}`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.name);
            });
        });
    });
});

mongoose.connect(`mongodb+srv://compass:${process.env.mongoP}@cluster0.d125p.mongodb.net/database?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) return console.error(err);
    console.log(chalk.bgGreen.black('Connected to MongoDB database!'));
});

client.elevation = message => {
    if (message.channel.type === 'dm') return;
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 3;
    if (message.member.id === message.guild.ownerID) permlvl = 4;
    if (message.author.id === settings.ownerid) permlvl = 5;
    return permlvl;
};

//keepAlive();
client.login(process.env.token);
