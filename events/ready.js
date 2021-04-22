const chalk = require('chalk');
module.exports = client => {
  client.user.setActivity(`${client.guilds.cache.size} servers  ⋙ c!help`, { type: 'WATCHING' })
  setInterval(() => {
    client.user.setActivity(`${client.guilds.cache.size} servers ⋙ c!help`, { type: 'WATCHING' })
  },20000);

  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
  client.guilds.cache.forEach((guild) => {
    if (!blacklist[guild.ownerID]) {
      return;
    }else{
        channel = guild.channels.cache.get(guild.systemChannelID || channelID)
      if(blacklist[guild.ownerID].state === true) {
        channel.send("The guild owner is blacklisted, so bye!")
        guild.leave(guild.id)
      }
    }
  })
  
};
