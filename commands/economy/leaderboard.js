const Discord = require('discord.js');
const mongoose = require('mongoose');
const Emeralds = require('../../models/emeralds.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];

exports.run = async (client, message, args) => {
  const cursor = Emeralds.find({}).sort({ 'coins': -1}).collation({locale: "en_US", numericOrdering: true})
  cursor.exec(async (err, result) => {
    if(!result) return console.log('returned')
    if (err) {
        console.error(err);
        return message.channel.send('Sorry, an error has occurred!');
    }
    let lstring = ``
    let order = 1
    for(let i = 0; i < result.length; i++) {
      if(i > result.length - 1) {
        break;
      }
      const user = await client.users.cache.get(`${result[i].userID}`)
     
      if(user != undefined && !user.bot) {
          lstring = lstring + `${numbers[i]} ${user.username} - ${result[i].emeralds} <:emerald:834856709011931147>\n`
          order++
      }
      if(order > 10) {
        break;
      }
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Richest users of " + client.user.username)
    .setDescription(lstring)
    .setTimestamp()
    .setColor("#00FF80")
    message.channel.send(embed);
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["lb",'rich',"richest",'millionair','nolife'],
    permLevel: 0
  };
  
exports.help = {
    name: 'leaderboard',
    description: 'Sends top 10 richest bot users',
    usage: 'leaderboard'
  };