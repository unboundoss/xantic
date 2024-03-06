const { Client } = require("discord.js");
const Message = require("../../Message");
const { EmbedBuilder } = require("@discordjs/builders");

/**
 * 
 * @param {Message} message
 * @param {Client} discord 
 */
const send = (message, database, channelId , discord) => {
    discord.channels.cache?.get(channelId).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: message.authorName,
                    iconURL: discord.user.displayAvatarURL()
                })
                .setDescription(message.message)
                .setFooter({
                    text: message.serverName,
                    iconURL: discord.user.displayAvatarURL()
                })
        ]
    }).catch((error) => {
        console.log(`Unable to Send Message to Channel [${channelId}]`);
    });
}

module.exports = send;