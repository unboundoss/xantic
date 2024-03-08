const { Client, Events } = require("discord.js");
const Message = require("./Message");
const discordSend = require("./client/discord/send");
const { data } = require("../commands/servers/setup");
/**
 * 
 * @param {Client} discord 
 */
const initMessageManager = async (
    database,
    discord
) => {
    function postMessage(message, uuid) {
        database.list("xan.guilds", {}, (list) => {
           for (var element of list) {
             if (element.client == "discord") discordSend(message, database, element.channelId, uuid, discord);
           }
        });
    }


    discord.on(Events.MessageCreate, (message) => {
        if(message.author.bot) return;
        database.search("xan.guilds", {
            serverId : message.guild.id
        }, async (data) => {
            if(data !== null){

                message.delete().catch((error) => {});

                var _message = new Message();
                _message.authorId = message.author.id;
                _message.authorName = message.author.username;
                _message.authorIcon = message.author.displayAvatarURL();
                _message.serverId = message.guild.id;
                _message.serverName = message.guild.name,
                _message.serverIcon = message.guild.iconURL();
                _message.message = message.content;

                database.insert("xan.messages", _message.toArray(), (uuid) => {
                    postMessage(_message.toArray(), uuid);
                });
            }
        });
    });
}

module.exports = initMessageManager;
