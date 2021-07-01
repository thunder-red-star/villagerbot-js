const Discord = require("discord.js")
const Canvas = require("canvas")
const Axios = require("axios")
Canvas.registerFont('./assets/minecraftfont.otf', { family: 'Minecraft' })

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function twoname(name_input_1, name_input_2) {
    let name_1;
    let name_2;

    function length(item) {
        return item.length
    }

    if (length(name_input_1) > length(name_input_2)) {
        name_1 = name_input_2;
        name_2 = name_input_1;
    }
    if (length(name_input_1) < length(name_input_2)) {
        name_1 = name_input_1;
        name_2 = name_input_2;
    }
    else {
        name_1 = name_input_1;
        name_2 = name_input_2;
    }

    let array1 = name_1.split(/(?=[A-Z])/);
    let array2 = name_2.split(/(?=[A-Z])/);

    let array_1;
    let array_2;

    if (length(array1) > length(array2)) {
        array_1 = array2;
        array_2 = array1;
    }
    if (length(array1) < length(array2)) {
        array_1 = array1;
        array_2 = array2;
    }
    else {
        array_1 = array1;
        array_2 = array2;
    }

    let middle_index_1;
    let middle_index_2;

    if (length(array2) > 1) {
        let middle_index_1 = Math.floor(length(array1) / 2)
        if (middle_index_1 == 0) {
            middle_index_1 = 1
        }
        let middle_index_2 = Math.floor(length(array2) / 2)
        return array1.slice(0, middle_index_1).join("") + array2.slice(middle_index_2).join("")
    }
    else {
        let middle_index_1 = Math.floor(length(name_1) / 2)
        let middle_index_2 = Math.floor(length(name_2) / 2)
        return name_1.split("").slice(0, middle_index_1).join("") + name_2.split("").slice(middle_index_2).join("")
    }
}

function quality(percent) {
    if (percent <= 15) {
        return "a horrible "
    }
    if (percent <= 30) {
        return "a bad "
    }
    if (percent <= 50) {
        return "a not so great  "
    }
    if (percent <= 65) {
        return "an ok "
    }
    if (percent <= 85) {
        return "a good "
    }
    if (percent <= 100) {
        return "a GREAT "
    }
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
        let avatar1 = await Canvas.loadImage("https://crafatar.com/renders/head/" + uuid1.data.id);
        let avatar2 = await Canvas.loadImage("https://crafatar.com/renders/head/" + uuid2.data.id);
        let heart = await Canvas.loadImage("https://cdn.discordapp.com/emojis/836685182516985927.png?v=1");
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
        ctx.textAlign = "center";
        ctx.font = '90px Minecraft';
        ctx.drawImage(heart, 425, 125, 150, 150)

        ctx.fillText("?", 503, 225);
        ctx.font = '60px Minecraft';

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
        ctx.fillRect(105, 355, (895 - 110) * percent / 100, 40)
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF"

        ctx.fillText(percent.toString() + "%", 500, 450);
        const attachment = new Discord.MessageAttachment(workspace.toBuffer(), 'ship-output.png');
        const embed = new Discord.MessageEmbed()
            .setDescription(twoname(user1, user2) + " would be " + quality(percent) + "couple!")
            .attachFiles(attachment)
            .setImage('attachment://ship-output.png')
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
    cooldown: 15,
    permLevel: 0
};

exports.help = {
    name: "ship",
    description:
        "Ships two minecraft players. Please provide 2 valid Minecraft usernames.",
    usage: "ship <user1> <user2>",
};
