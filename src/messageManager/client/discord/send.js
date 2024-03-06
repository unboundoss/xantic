const { Client } = require("discord.js");
const Message = require("../../Message");
const { EmbedBuilder } = require("@discordjs/builders");

/**
 * 
 * @param {Message} message
 * @param {Client} discord 
 */
const send = (message, database, channelId , uuid , discord) => {
    discord.channels.cache?.get(channelId).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: message.authorName,
                    iconURL: message.authorIcon || discord.user.displayAvatarURL()
                })
                .setDescription(message.message)
                .setTimestamp()
                .setFooter({
                    text: message.serverName,
                    iconURL: message.serverIcon || discord.user.displayAvatarURL()
                })
        ]
    }).catch((error) => {
        console.log(`Unable to Send Message to Channel [${channelId}]`);
    }).then((_message) => {
        database.insert("xan.messageDelivery" ,{
            channelId: channelId,
            messageId : _message.id,
            client: "discord",
            link: uuid
        }, (uuid) => {});
    });
}

module.exports = send;