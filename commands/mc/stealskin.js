const Discord = require("discord.js")
const Canvas = require("canvas")
const Axios = require("axios")
Canvas.registerFont('./assets/minecraftfont.otf', { family: 'Minecraft' })


exports.run = async (client, message, args, tools) => {
    try {
        let mcuser = message.content.split(" ").slice(1, 2).join(" ")
        let uuid = await Axios.get("https://api.mojang.com/users/profiles/minecraft/" + mcuser)
        const embed = new Discord.MessageEmbed()
            .setImage("https://crafatar.com/renders/body/" + uuid.data.id)
            .setThumbnail('https://crafatar.com/skins/' + uuid.data.id)
            .setColor("#00FF80")
        message.channel.send(embed)
    }
    catch (error) {
        message.channel.send("One of the names you provided is not a valid Minecraft username, please try again.")
        console.log(error)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 10,
    permLevel: 0
};

exports.help = {
    name: "stealskin",
    description:
        "Steals the skin of a minecraft user and renders it.",
    usage: "ship <user>",
};
