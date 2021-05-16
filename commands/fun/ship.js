const Discord = require("discord.js")
const Canvas = require("canvas")
const Axios = require("axios")
Canvas.registerFont('./assets/minecraftfont.otf', { family: 'Minecraft' })

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.run = async (client, message, args, tools) => {
    try {
        let user1 = message.content.split(" ").slice(1, 2).join(" ")
        let user2 = message.content.split(" ").slice(2, 3).join(" ")
        let uuid1 = await Axios.get("https://api.mojang.com/users/profiles/minecraft/" + user1)
        let uuid2 = await Axios.get("https://api.mojang.com/users/profiles/minecraft/" + user2)
        if (uuid1.data.error == "Not Found") {
            return message.channel.send(user2 + " is not a valid Minecraft username!")
        }
        if (uuid2.data.error == "Not Found") {
            return message.channel.send(user2 + " is not a valid Minecraft username!")
        }
        let avatar1 = await Canvas.loadImage("https://crafatar.com/avatars/" + uuid1.data.id);
        let avatar2 = await Canvas.loadImage("https://crafatar.com/avatars/" + uuid2.data.id);
        const workspace = Canvas.createCanvas(1000, 525);
        const ctx = workspace.getContext('2d');
        ctx.font = '60px Minecraft';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "left";
        ctx.fillText(user1, 100, 50);
        ctx.textAlign = "right";
        ctx.fillText(user2, 900, 50);
        ctx.drawImage(avatar1, 100, 100, 200, 200);
        ctx.drawImage(avatar2, 700, 100, 200, 200);
        let percent;
        if (user1 == "GeorgeNotFound" && user2 == "Dream" || user1 == "Dream" && user2 == "GeorgeNotFound") {
            percent = 100
        }
        else {
            percent = randint(0, 100)
        }
        ctx.lineWidth = "5";
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillRect(100, 350, 800, 50);
        ctx.fillStyle = "#FF69B4"
        ctx.fillRect(105, 355, 105 + (795 - 110) * percent / 100, 40)
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF"

        ctx.fillText(percent.toString() + "%", 500, 450);
        const attachment = new Discord.MessageAttachment(workspace.toBuffer(), 'ship-output.png');
        const embed = new Discord.MessageEmbed()
            .attachFiles(attachment)
            .setImage('attachment://ship-output.png')
            .setColor("#00FF80")
        message.channel.send(embed)
    }
    catch {
        message.channel.send("One of the names you provided is not a valid Minecraft username, please try again.")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 15,
    permLevel: 0
};

exports.help = {
    name: "ship",
    description:
        "Ships two minecraft players. Please provide 2 valid Minecraft usernames.",
    usage: "ship <user1> <user2>",
};
