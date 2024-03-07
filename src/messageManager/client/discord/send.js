const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("DELETE_MESSAGE")
                        .setLabel("Delete")
                        .setEmoji('🗑')
                        .setStyle(ButtonStyle.Secondary)
                )
        ]
    }).catch((error) => {
        console.log(`Unable to Send Message to Channel [${channelId}]`);
    }).then((_message) => {
        database.insert("xan.messageDelivery" ,{
            channelId: _message.channelId,
            messageId : `${_message.id}`,
            client: "discord",
            link: uuid
        }, (uuid) => {});
    });
}

module.exports = send;