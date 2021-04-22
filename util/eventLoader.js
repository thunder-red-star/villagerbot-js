const reqEvent = event => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('message', reqEvent('message'));
  client.on('guildCreate', reqEvent('guildCreate'))
  //client.on('guildMemberAdd', reqEvent('guildMemberAdd'))
};
