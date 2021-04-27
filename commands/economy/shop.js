const Discord = require("discord.js")
const Emeralds = require('../../models/emeralds.js')
const mongoose = require('mongoose')
const iteminfo = require('../../assets/items.json')
const Pagination = require('discord-paginationembed')

const sections = ["tools", "weapons", "books", "magic", "trophies", "other", "deals"]

const items = {
    "tools": ["wood_pickaxe", "stone_pickaxe", "iron_pickaxe", "gold_pickaxe", "diamond_pickaxe", "netherite_pickaxe"],
    "weapons": ["wood_sword", "stone_sword", "iron_sword", "gold_sword", "diamond_sword", "netherite_sword", "bow"],
    "books": ["looting_i", "looting_ii", "efficiency_i", "efficiency_ii", "fortune_i", "fortune_ii", "lure_i"],
    "magic": ["haste_i", "strength_1", "regeneration_1", "vault_potion"],
    "trophies": ["rich_person_trophy", "miner_trophy", "fisher_trophy", "buyer_trophy", "emerald_trophy"],
    "other": ["enchant_table", "bee_jar"],
    "deals": ["deal1", "deal2", "deal3", "deal4"]
}

function getworth(item) {
    return iteminfo[item].worth
}

function getcost(item) {
    return iteminfo[item].cost
}
function getstick(item) {
    return iteminfo[item].sticky
}

function getname(item) {
    return iteminfo[item].name
}
function buyable(item) {
    return iteminfo[item].buyable
}
function numtobool(n) {
    if (n == 1) {
        return true
    }
    else {
        return false
    }
}
exports.run = async (client, message, args, tools) => {
    const Settings = require('../../models/settings.js'),
          data = await Settings.findOne({
            guildID: message.guild.id
        });
    if (!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setTitle("Villager Bot JS Shop")
            .setDescription("Welcome to the Villager Bot JS Shop! Here you can buy stuff to become better and show off to your friends.")
            .addField("Tools ⛏", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Tools, such as pickaxes and more!\")\n\`v!!shop tools\`", true)
            .addField("Weapons ⚔", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Weapons, such as swords and bows\")\n\`v!!shop weapons\`", true)
            .addField("Books 📗", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Enchanted books for your tools and swords!\")\n\`v!!shop books\`", true)
            .addField("Magic ✨", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Potions such as strength and haste!\")\n\`v!!shop magic\`", true)
            .addField("Trophies 🥇", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Trophies! They'll reset your ratings in the section they're meant for but you can use them to flex!\")\n\`v!!shop trophies\`", true)
            .addField("Other ❓", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Who knows what you'll find here!\")\n\`v!!shop other`", true)
            .addField("Weekly Deals 🎉", "[Hover for info](https://thunderredstar.me/villager-bot-js-info/ \"Deals of the week! Huge Discounts!\")\n\`v!!shop deals`", false)
            .setColor("#00FF80")
            .setTimestamp()

        message.channel.send(embed)
    }
    else {
        if (sections.includes(args[0])) {
            var embeds = [];
            items[args[0]].forEach((item) => {
                if (buyable(item) == 1) {
                    embeds.push(new Discord.MessageEmbed().setTitle(getname(item)).setDescription("Buy me by using `" + data.prefix + "buy " + item + "`").addField("Cost", getcost(item) + "<:emerald:834856709011931147>", true).addField("Worth", getworth(item)+"<:emerald:834856709011931147>", true).addField("Sticky?", numtobool(getstick(item), true)))
                }
            })
            new Pagination.Embeds()
                .setArray(embeds)
                .setAuthorizedUsers([message.author.id])
                .setChannel(message.channel)
                .setPageIndicator(true)
                .setPage(1)
                .setTimestamp()
                .setColor("#00FF80")
                .build();
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 3,
    permLevel: 0
};

exports.help = {
    name: "shop",
    description:
        "Opens up the shop where you can buy items for your emeralds.",
    usage: "shop <category>",
};
